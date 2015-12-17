var express = require('express');
var router = express.Router({mergeParams: true});
var async = require('async');
var request = require('request');
var _ = require('underscore');
var Promise = require('bluebird');

var jwt = require('jsonwebtoken');
var config = rootRequire('config/auth');

var mongoose = require('mongoose');
//var TabInfo = rootRequire('models/tabInfo');
var User = rootRequire('models/user');
/*
*
* Check for tokens (basically, ensure our user is logged in before using the API
*
*/

router.use(function(req, res, next) {
  // .. some logic here .. like any other middleware
  var token = (req.body.token)? req.body.token : req.query.token;
  jwt.verify(token, config.jwtKey, function(err, decoded) {
    if (err) return res.status(401).send(err);
    req.query.user = decoded._id;
    next();
  });
});

//Add a new task
router.post('/', function(req, res, next) {
  console.log("Getting here");
  var task = new Task({name: req.body.name, type: req.body.type, user: req.query.user});
  task.save(function(err) {
    if (err) return next(err);
    res.send(task);
  });
});

//Get all tasks (for the logged in user)
router.get('/', function(req, res, next) {
  Task.find({user: req.query.user}).sort({created: -1}).execAsync().then(function(tasks) {
    res.send(tasks);
  }).catch(function(err) {
    next(err);
  });
});

//Get a specific task (for the logged in user)
router.get('/:name', function(req, res, next) {
  Task.find({user: req.query.user, name: req.params.name}).sort({created: 1}).execAsync().then(function(tasks) {
    res.send(tasks);
  }).catch(function(err) {
    next(err);
  });
});

//Associate a nav root with a task
router.post('/associate', function(req, res, next) {
  Promise.map(req.body.tabs, function(item) {
    return Tab.findOne({_id: item.tab}).execAsync().then(function(tab) {
      //Found the task that we want
      tab.tasks.push({name: item.name});
      return tab.saveAsync();
    });
  }).then(function(tabs) {
    res.send(tabs);
  }).catch(function(err) {
    next(err);
  });
});

//Remove a task
router.delete('/:id', function(req, res, next) {
  Task.findOneAndRemove({_id: req.params.id}).execAsync().then(function(task) {
    res.send({delete: true});
  }).catch(function(err) {
    next(err);
  })
});


module.exports = router;
