var express = require('express');
var router = express.Router({mergeParams: true});
var async = require('async');
var request = require('request');
var _ = require('underscore');
var Promise = require('bluebird');
var moment = require('moment');

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
  router.get('/:device/hourly', function(req, res, next) {
    var today = moment().add(req.query.date, 'days').startOf('day');
    var tomorrow = moment(today).endOf('day');
    
    PlantRecord.aggregate([     
      { "$match": { 
        time: {
          "$gte": today.toDate(),
          "$lt": tomorrow.toDate()
        },
        device: new mongoose.Types.ObjectId(req.params.device)
      }},
      { "$group": {         
        "_id": {             
          "year": { "$year": "$time" },             
          "dayOfYear": { "$dayOfYear": "$time" },
          "hour": { "$hour": "$time"},
          "interval": {                 
            "$subtract": [                      
              { "$minute": "$time" },                     
              { "$mod": [{ "$minute": "$time"}, 15] }                 
            ]             
          }         
        },         
        "temp": { "$avg": "$temp" },         
        "humid": { "$avg": "$humid" },         
        "lux": { "$avg": "$lux" },         
        "soil": { "$avg": "$soil" }     
      }},
      { "$sort": {"_id.dayOfYear": 1, "_id.hour": 1, "_id.interval": 1}}
    ], function(err, out) {
      if (err)
        return next(err);
      
      res.json(out);
    });
    
  });
  
  //Get a current users list of locations and plants
  router.get('/:device/weekly', function(req, res, next) {
    var weekStart = moment().add(req.query.date, 'weeks').startOf('week');
    var weekEnd = moment(weekStart).endOf('week');
    
    PlantRecord.aggregate([     
      { "$match": { 
        time: {
          "$gte": weekStart.toDate(),
          "$lt": weekEnd.toDate()
        },
        device: new mongoose.Types.ObjectId(req.params.device)
      }},
      { "$group": {         
        "_id": {             
          "year": { "$year": "$time" },             
          "dayOfYear": { "$dayOfYear": "$time" },
          "dayOfWeek": { "$dayOfWeek": "$time" },
          "interval": {                 
            "$subtract": [                      
              { "$hour": "$time" },                     
              { "$mod": [{ "$hour": "$time"}, 6] }                 
            ]             
          }         
        },         
        "temp": { "$avg": "$temp" },         
        "humid": { "$avg": "$humid" },         
        "lux": { "$avg": "$lux" },         
        "soil": { "$avg": "$soil" }     
      }},
      { "$sort": {"_id.year": 1, "_id.dayOfYear": 1, "_id.interval": 1}}
    ], function(err, out) {
      if (err)
        return next(err);
      
      res.json(out);
    });
  });
  
  //Get a current users list of locations and plants
  router.get('/:device/monthly', function(req, res, next) {
    var monthStart = moment().add(req.query.date, 'months').startOf('month');
    var monthEnd = moment(monthStart).endOf('month');
    
    PlantRecord.aggregate([     
      { "$match": { 
        time: {
          "$gte": monthStart.toDate(),
          "$lt": monthEnd.toDate()
        },
        device: new mongoose.Types.ObjectId(req.params.device)
      }},
      { "$group": {         
        "_id": {             
          "year": { "$year": "$time" },             
          "dayOfYear": { "$dayOfYear": "$time" },
          "dayOfMonth": {"$dayOfMonth": "$time" },
        },         
        "temp": { "$avg": "$temp" },         
        "humid": { "$avg": "$humid" },         
        "lux": { "$avg": "$lux" },         
        "soil": { "$avg": "$soil" }     
      }},
      { "$sort": {"_id.year": 1, "_id.dayOfYear": 1}}
    ], function(err, out) {
      if (err)
        return next(err);
      
      res.json(out);
    });
  });
  
  return router;
}
