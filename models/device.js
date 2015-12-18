var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

//Extra task details here

var deviceSchema = new mongoose.Schema({
  uuid: {type: String, required: true, index: true, unique: true},
  user: {type: ObjectId},
  chipSize: Number,
  firmware: String,
  mac: String,
  lastConnection: {type: Date, required: true, default: Date.now},
  config: {
    humidDiff: {type: Number, default: 20},
    tempDiff: {type: Number, default: 10},
    luxDiff: {type: Number, default: 400},
    hygroDiff: {type: Number, default: 200}
  }
});

module.exports = mongoose.model('Device', deviceSchema);
