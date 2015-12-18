var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

//Extra task details here

var plantRecordSchema = new mongoose.Schema({
  device: {type: ObjectId, required: true, index: true},
  time: {type: Date, required: true},
  temp: {type: Number},
  humid: {type: Number},
  lux: {type: Number},
  soil: {type: Number}
});

module.exports = mongoose.model('PlantRecord', plantRecordSchema);
