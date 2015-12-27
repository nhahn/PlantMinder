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

  //Get a current user's profile
  router.get('/', function(req, res, next) {
    delete req.user.local.password;
    res.json(req.user);
  });

  router.post('/update/password', function(req, res, next) {
    req.user.local.password = req.user.generateHash(req.body.password);
    req.user.save(function(err) {
      if (err) {
        res.status(403);
        res.flash("Invalid password", "error");
        res.json({err: err.message});
      }
      res.flash("Password updated!", "info");
      res.json({complete: true});
    });
  });

  router.post('/update/email', function(req, res, next) {
    req.user.local.email = req.body.email;
    req.user.save(function(err) {
      if (err) {
        res.status(403);
        res.flash("Invalid email", "error");
        res.json({err: err.message});
      }
      res.flash("Email updated!", "info");
      res.json({local: {email: req.user.email}});
    });
  });
  
  router.post('/update/phone', function(req, res, next) {
    req.user.phone = req.body.phone;
    req.user.carrier = req.body.carrier;
    req.user.notifications.sms = false;
    req.user.save(function(err) {
      if (err) {
        res.status(403);
        res.flash("Invalid phone", "error");
        res.json({err: err.message});
      }
      res.flash("Phone updated!", "info");
      res.json({phone: req.user.phone, carrier: req.user.carrier, notificaations: {sms: req.user.notifications.sms}});
    });
  });

  router.post('/update/image', function(req, res, next) {
    req.user.image = req.body.image;
    req.user.save(function(err) {
      if (err) {
        res.status(403);
        res.flash("Invalid image", "error");
        res.json({err: err.message});
      }
      res.flash("Profile image updated!", "info");
      res.json({image: req.user.image});
    });
  });
  
  return router;
}
