var express = require('express');
var router = express.Router({mergeParams: true});
var async = require('async');
var request = require('request');
var _ = require('underscore');
var Promise = require('bluebird');
var rp = require('request-promise');

var jwt = require('jsonwebtoken');
var config = rootRequire('config/auth');

var mongoose = require('mongoose');
//var TabInfo = rootRequire('models/tabInfo');
var Device = rootRequire('models/device');
var PlantRecord = rootRequire('models/plantRecord');
/*
*
* Check for tokens (basically, ensure our user is logged in before using the API
*
*/

module.exports = function(passport) {
  router.use(function(req, res, next) {
    // .. some logic here .. like any other middleware
    passport.authenticate('jwt', function(err, user, info) {
      if (err || !user) {
        res.status(401); 
        if (!user) {
          res.flash("No user found", "error");
          res.json({err: "Please provide a valid email and/or password"});
        } if (err) {
          res.flash(err.message, "error");  
          res.json({err: err.message});
        }
        return;
      }
      req.user = user;
      next();   
    })(req, res, next);
  });

  //Get a current users list of locations and plants
  router.get('/', function(req, res, next) {
    res.json(req.user.locations);
  });
  
  //Get a the device profile
  router.get('/:id/device', function(req, res, next) {
    Device.findOne({uuid: req.params.id}).execAsync().then(function(device) {
      if (!device || device.user.toString() != req.user._id) {
        return res.status(404).json({err: "Cannot find device!"});
      } else {
        return res.json(device); 
      }
    }).catch(function(err) {
      next(err);
    });
  });
  
  router.put('/:location/:id/image', function(req, res, next) {
    var location = req.user.locations.id(req.params.location)
    if (!location) { return res.status(404).json({err: "Cannot find location that plant is in"}); }
    var plant = location.plants.id(req.params.id)
    if (!plant) { return res.status(404).json({err: "Cannot find plant with that ID"}); }
    
    plant.image = req.body.image;
    req.user.save(function(err, user) {
      if(err) { return next(err); };
      res.json({status: "Image updated"});
    });
  });

  router.post('/:location/:id/update', function(req, res, next) {
    var location = req.user.locations.id(req.params.location);
    if (!location) { return res.status(404).json({err: "Cannot find location that plant is in"}); }
    var plant = location.plants.id(req.params.id);
    if (!plant) { return res.status(404).json({err: "Cannot find plant with that ID"}); }
    Object.keys(req.body).forEach(function(key) {
      plant[key] = req.body[key];
    });
    req.user.save(function(err, user) {
      if(err) { return next(err); };
      delete plant.image;
      res.json(plant);
    });
  });
  
  router.post('/associate', function(req, res, next) {
    Device.findOne({uuid: req.body.uuid}).execAsync().then(function(device) {      
      if (!device) {
        throw new Error("No device found. Did it correctly connect to WiFi?");
      } else if (device.user) {
        throw new Error("Device already associated with another user");
      } else {
        if (req.user.locations.length < 1) {
          console.log('http://freegeoip.net/json/'+req.ip);
          return rp({uri: 'http://freegeoip.net/json/'+req.ip, json: true}).then(function(response) {
            req.user.locations.push({ name: "Default", latlng: [response.latitude, response.longitude] })
            return device;
          });
        } else {
          return device;
        }
      }
    }).then(function(device) {
      req.user.locations[0].plants.push({device: {id: device._id, uuid: device.uuid}, name: "NewPlant", type: "Unknown"});
      device.user = req.user._id;
      return [req.user.saveAsync(), device.saveAsync()];
    }).map(function(user, device) {
      return res.json({associated: true, device: device});
    }).catch(function(err) {
      return res.status(404).json({err: err.message})
    });
  });


  return router;
}
