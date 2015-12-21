var express = require('express');
var router = express.Router({mergeParams: true});
var async = require('async');
var _ = require('underscore');

var mongoose = require('mongoose');
//var Character = rootRequire('models/character');

//router.use('/characters', require('./characters'))
module.exports = function(passport) {
  
  router.use('/plants', require('./plants')(passport));
  router.use('/profile', require('./profile')(passport));
  router.use('/devices', require('./devices')); 
  
  return router
}
