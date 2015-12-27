var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

var mongoose = require('mongoose');
var User = rootRequire('models/user');
var config = rootRequire('config/auth');

module.exports = function(passport) {

  router.use(function(req, res, next) {
    // .. some logic here .. like any other middleware
    passport.authenticate('jwt', function(err, user, info) {
      if (user) {
        req.user = user;
      }
      next();   
    })(req, res, next);
  }); 

  // POST /auth/signup
  // Register a new user and password
  router.post('/signup', function(req, res, next){
    passport.authenticate('local-signup', function(err, user, info) {
      if (err) {
        return res.status(500).json({err: err}) };
      if (!user) {return res.status(403).json({err: info}) };
      var token = jwt.sign({user: user._id, email: user.email}, config.jwtKey, config.jwtOptions);
      res.json({token: token});
    })(req, res, next);
  });

  //POST /auth/login
  // Logs into an account and gets a token
  router.post('/login', function(req, res, next) {
    passport.authenticate('local-login', function(err, user, info) {
      if (err || !user) {
        res.status(403); 
        if (!user) {
          res.flash("Incorrect username and/or password", "error");
          res.json({err: "Please provide a valid email and/or password"});
        } if (err) 
          res.json({err: err.message});
        return;
      }
      var token = jwt.sign({user: user._id, email: user.email}, config.jwtKey, config.jwtOptions);
      res.json({token: token});
    })(req, res, next);
  });

  //GET /auth/verify/:token
  // Verifies a particular JWT token
  router.get('/verify/:token', function(req, res, next) {
    User.findOne({'local.token': req.params.token}, function(err, user) {
      if (err) {
        res.flash(err.message, "error");
        return next();
      }
      if (!user) {
        res.flash("Verification token invalid", "info");
        return next();
      }
      user.local.verified = true;
      user.local.token = null;
      user.save(function(err) {
        if(err) { throw err;}
        res.flash("Email address verified!", "success");
        next();
      });
    });
  });

  // =====================================
  // FACEBOOK ROUTES =====================
  // =====================================
  // route for facebook authentication and login
  router.get('/facebook', passport.authenticate('facebook', {scope: 'email'}));
  router.get('/facebook/callback', function (req, res, next) {
    passport.authenticate('facebook', function(err, user, info) {
      if (err || !user) {
        res.status(401); 
        return res.json({err: err});
      }
      var token = jwt.sign({user: user._id, email: user.email}, config.jwtKey, config.jwtOptions);
      res.locals.token = token;
      next();
    })(req, res, next);
  });

  // =====================================
  // GOOGLE ROUTES =======================
  // =====================================
  // send to google to do the authentication
  // profile gets us their basic information including their name
  // email gets their emails
  router.get('/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

  // the callback after google has authenticated the user
  router.get('/google/callback', function(req, res, next) {
    passport.authenticate('google', function(err, user, info) {
      if (err || !user) {
        res.status(401); 
        return res.json({err: err});
      }
      var token = jwt.sign({user: user._id, email: user.email}, config.jwtKey, config.jwtOptions);
      res.locals.token = token;
      res.locals.user = user._id;
      next();
    })(req, res, next);
  });

  // =============================================================================
  // UNLINK ACCOUNTS =============================================================
  // =============================================================================
  // used to unlink accounts. for social accounts, just remove the token
  // for local account, remove email and password
  // user account will stay active in case they want to reconnect in the future

  // local -----------------------------------
  router.get('/unlink/local', function(req, res) {
      var user            = req.user;
      user.local.email    = undefined;
      user.local.password = undefined;
      user.save(function(err) {
          res.redirect('/profile');
      });
  });

  // facebook -------------------------------
  router.get('/unlink/facebook', function(req, res) {
      var user            = req.user;
      user.facebook.token = undefined;
      user.save(function(err) {
          res.redirect('/profile');
      });
  });

  // google ---------------------------------
  router.get('/unlink/google', function(req, res) {
      var user          = req.user;
      user.google.token = undefined;
      user.save(function(err) {
         res.redirect('/profile');
      });
  });

  // =============================================================================
  // AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
  // =============================================================================

  router.post('/connect/local', passport.authenticate('local-signup', {
      successRedirect : '/profile', // redirect to the secure profile section
      failureRedirect : '/profile', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
  }));

  // facebook -------------------------------

  // send to facebook to do the authentication
  router.get('/connect/facebook', function(req, res) {
    if (!req.user)
      return res.status(401).json({err: "Cannot use connect method without signing in"});
    var token = req.get('Authorization').substring(4);
    passport.authorize('facebook', { scope : 'email', state: token})(req,res);
  });

  // handle the callback after facebook has authorized the user
  router.get('/connect/facebook/callback',
      passport.authorize('facebook', {
          successRedirect : '/profile',
          failureRedirect : '/'
      }));

  // google ---------------------------------

  // send to google to do the authentication
  router.get('/connect/google', function(req, res) {
    if (!req.user)
      return res.status(401).json({err: "Cannot use connect method without signing in"});
    var token = req.get('Authorization').substring(4);
    passport.authorize('google', { scope : ['profile', 'email'], state: token})(req, res);
  });
                                  

  // the callback after google has authorized the user
  router.get('/connect/google/callback',
      passport.authorize('google', {
          successRedirect : '/profile',
          failureRedirect : '/'
      }));

  return router
};

