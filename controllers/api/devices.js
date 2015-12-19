var express = require('express');
var router = express.Router({mergeParams: true});
var request = require('request');
var _ = require('underscore');
var Promise = require('bluebird');

var config = rootRequire('config/auth');
var appConfig = rootRequire('config/app');

var mongoose = require('mongoose');
//var TabInfo = rootRequire('models/tabInfo');
var User = rootRequire('models/plantRecord');
var Device = rootRequire('models/device');
var compareVersions = require('compare-version');

/*
*
* Check for tokens (basically, ensure our user is logged in before using the API
*
*/

//Add a new task
router.get('/update', function(req, res, next) {
  //Check if we have the right user agent
  var deviceInfo = {
    mac: req.get('x-ESP8266-STA-MAC'),
    apMac: req.get('x-ESP8266-AP-MAC'),
    freeSpace: req.get('x-ESP8266-free-space'),
    sketchSize: req.get('x-ESP8266-sketch-size'),
    chipSize: req.get('x-ESP8266-chip-size'),
    sdkVerson: req.get('x-ESP8266-sdk-version'),
    mode: req.get('x-ESP8266-mode'),
    version: req.get('x-ESP8266-version')
  };
  
  if ( compareVersions(appConfig.firmwareVersion, deviceInfo.version) > 0 ) {
    //we send our update
    res.set('x-MD5', appConfig.firmwareMD5);
    res.sendFile('public/firmware/'+appConfig.firmwareVersion+'_firmware.bin');
  } else {
    //otherwise, we send an empty response
    res.status(304);
    res.end('No Update');
  }
});

//Get all tasks (for the logged in user)
router.post('/:deviceID/newData', function(req, res, next) {
  Device.findOne({uuid: req.params.deviceID}).execAsync().then(function(device) {
    //Save data here
  }).catch(function(err) {
    next(err);
  });
  res.json({});
});

//Get a specific task (for the logged in user)
router.get('/:deviceID/getConfig', function(req, res, next) {
  var deviceInfo = {
    mac: req.get('x-ESP8266-STA-MAC'),
    chipSize: req.get('x-ESP8266-chip-size'),
    version: req.get('x-ESP8266-version')
  };
  Device.findOne({uuid: req.params.deviceID}).execAsync().then(function(device) {
    if (device) {
      res.json({time: Date.now, config: device.config, associated: (device.user != null)});
    } else {
      var device = new Device({uuid: req.params.deviceID, 
                               chipSize: deviceInfo.chipSize, 
                               firmware: deviceInfo.version, 
                               mac: deviceInfo.mac})
      device.save(function(err, device) {
        if (err) {
          res.status(500);
          res.send(err.message);
        }
        res.json({time: Date.now, config: device.config, associated: (device.user != null)});
      });
    }
  }).catch(function(err) {
    next(err);
  });
});


module.exports = router;