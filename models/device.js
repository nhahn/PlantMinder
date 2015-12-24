var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

//Extra task details here

var deviceSchema = new mongoose.Schema({
  uuid: {type: String, required: true, index: true, unique: true},
  user: {type: ObjectId},
  chipSize: Number,
  firmware: String,
  mac: {type: String, unique: true, index: true},
  lastConnection: {type: Date, required: true, default: Date.now},
  config: {
    fileSize: {type: Number, default: 600}, //time between transfers (fileSize / 20) * 20
    measurementFrequency: {type: Number, default: 180}, //sleep time in seconds
    humidDiff: {type: Number, default: 20},
    tempDiff: {type: Number, default: 10},
    luxDiff: {type: Number, default: 400},
    hygroDiff: {type: Number, default: 200}
  }
});

module.exports = mongoose.model('Device', deviceSchema);
