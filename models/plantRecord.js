var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;
var User = rootRequire('models/user');
var Device = rootRequire('models/device');
var Promise = require('bluebird');

//Extra task details here

var plantRecordSchema = new mongoose.Schema({
  device: {type: ObjectId, required: true, index: true},
  time: {type: Date, required: true, index: true},
  temp: {type: Number},
  humid: {type: Number},
  lux: {type: Number},
  soil: {type: Number}
});

//Do some checks for watering, sunlight requirements, etc. 
plantRecordSchema.post('save', function(doc) {
  User.findOne({'locations.plants': doc.device}, {'locations.$': 1, 'locations.plants.$': 1}).execAsync().then(function(user) {
    var plant = user.locations[0].plants[0];
    PlantRecord.find({device: doc.device}).sort({time: -1}).limit(4).execAsync();
  }).then(function(records) {
    
  }).catch(function(err) {
    console.log(err);
  });
});

var PlantRecord = mongoose.model('PlantRecord', plantRecordSchema);
module.exports = PlantRecord;
