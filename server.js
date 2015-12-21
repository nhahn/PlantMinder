var path = require('path');
global.rootRequire = function(name) {
  return require(__dirname + '/' + name);
}
global.appRoot = path.resolve(__dirname)

var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var swig  = require('swig');
var React = require('react');
var Router = require('react-router');
var routes = require('./app/routes');
var config = require('./config/app');
var cors = require('cors');
var app = express();
var Promise = require('bluebird');
var _ = require('underscore');
var passport = require('passport'); 
var expressValidator = require('express-validator');

express.response.flash = function(message, level) {
  var messages = this.get('X-FlashMessages') || '[]';
  messages = JSON.parse(messages);
  messages.push([message, level]);
  this.set('X-FlashMessages', JSON.stringify(messages))
}

app.use(expressValidator({
  customValidators: {

  }
}));

app.enable('trust proxy');

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.raw({ type: 'application/sensordata' }));

app.use(express.static(path.join(__dirname, 'public')));

require('./config/passport')(passport); // pass passport for configuration
app.use(passport.initialize());

/*
 * Redirect to HTTPs on production
 */ 

if (config.production) {
  app.use(function(req, res, next) {
    if (req.headers['x-forwarded-proto'] == 'http') {
      res.redirect('https://' + req.headers.host + req.path);
    } else {
      return next();
    } 
  });
}

/*
 * MongoDB models
 */

var mongoose = require('mongoose');
Promise.promisifyAll(mongoose);
var User = require('./models/user');

mongoose.connect(config.database);
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});


/*
 * Routes 
 */

app.use('/auth', require('./controllers/auth')(passport));
app.use('/api', require('./controllers/api')(passport));

/*
 * React.js router
 */

app.use(function(req, res, next) {
  var router = Router.create({
    routes: routes,
    location: req.path,
    onError: function(err) {
      next(error);
    },
    onAbort: function(abortReason) {
      if (abortReason.constructor.name === "Redirect") {
        var url = router.makePath(abortReason.to, abortReason.params, abortReason.query);
        res.redirect(url);
      } else {
        next(abortReason);
      }
    }
  });
  router.run(function(Handler) {
    var messages = res.get('X-FlashMessages') || '[]';
    var html = React.renderToString(React.createElement(Handler));
    var page = swig.renderFile('views/index.html', { html: html, messages: messages, token: res.locals.token});
    res.send(page);
  });
});


/**
 * Socket.io stuff.
 */
var server = require('http').createServer(app);
var io = require('socket.io')(server, {
  transports: ['websocket'] 
});
var socketioJwt = require("socketio-jwt");
var onlineUsers = 0;

/*Maybe??
io.use(socketioJwt.authorize({
  secret: config.jwtKey
  handshake: true
});
*/

io.sockets.on('connection', function(socket) {
  onlineUsers++;

  io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });

  socket.on('disconnect', function() {
    onlineUsers--;
    io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });
  });
});

server.listen(config.port, config.ip, function() {
  console.log('Express server listening on port ' + config.port);
});
