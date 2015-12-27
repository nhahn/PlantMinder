var path = require('path');
global.rootRequire = function(name) {
  return require(__dirname + '/' + name);
}
global.appRoot = path.resolve(__dirname)

/*
 * MongoDB models
 */

var mongoose = require('mongoose');
var moment = require('moment');
var Promise = require('bluebird');

Promise.promisifyAll(mongoose);
var config = require('./config/app');

mongoose.connect(config.database);
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});


var Device = require('./models/device.js');
var PlantRecord = require('./models/plantRecord.js');


Device.findOne({uuid: 'test'}).execAsync().then(function(device) {
  if (device) 
    return device
  else
    return (new Device({uuid: 'test', mac: 'AA:AA:AA:AA:AA', firmware: '0.0.0'})).saveAsync();
}).then(function(device) {
  console.log(device)
  var end = moment().endOf("month");
  var d = moment().startOf('month');

  var temp = 22, humid = 38, lux = 100, soil = 20; 
  while ( d < end ) {
    (function(d) {
      var t = temp + 3 * Math.random() - 1.5;
      var h = humid + 4 * Math.random() - 2;
      var l = lux + 40 * Math.random() - 20;
      var s = soil + 5 * Math.random() - 2.5;
      var time = new Date(d.toDate().getTime());
      console.log(time);
      var p = new PlantRecord({device: device._id, time: time, temp: t, humid: h, lux: l,
                       soil: s})
      p.save(function(err) { if (err) console.log(err); else console.log(p);});
    })(d);
    d.add(2, 'minutes');
  }

}).catch(function(err) { console.log(err) });
  
                                                                    
