var mongoose = require('mongoose');
var bcrypt   = require('bcryptjs');
var ObjectId = mongoose.Schema.ObjectId;

var plantSchema = new mongoose.Schema({
      image: String,
      device: {id: {type: ObjectId, required: true}, uuid: {type: String, required: true}},
      name: {type: String, required: true},
      type: {type: String, required: true},
      outside: {type: Boolean, default: false},
      thresholds: {
        temp: {type: Number, default: -1},
        lux: {type: Number, default: -1},
        humid: {type: Number, default: -1},
        soil: {type: Number, default: -1}
      }
    });

var userSchema = new mongoose.Schema({
  local: {
    email          : {type: String, match: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i, unique: true},
    password       : {type: String},
    verified       : {type: Boolean, default: false},
    token          : {type: String, index: {sparse: true}},
    reset          : {type: Boolean, default: false}
  },
  facebook         : {
      id           : {type: String, index: {sparse: true}},
      token        : String,
      email        : {type: String, match: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i },
      name         : String
  },
  google           : {
      id           : {type: String, index: {sparse: true}},
      token        : String,
      email        : {type: String, match: /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i },
      name         : String
  },
  image: String,
  phone: String,
  carrier: String,
  notifications: {
    sms: {type: Boolean, default: false},
    watering: Boolean,
    temp: Boolean,
    humid: Boolean,
    push: Boolean
  },
  lastLogin: {type: Date, default: Date.now},
  locations: { type: [{
    name: {type: String, required: true},
    latlng: {type: [{type: Number}], require: true, validate: [function(val) { return val.length == 2 }, '{PATH} should be a lat and lon value']}, 
    plants: [plantSchema]
  }]}
});

userSchema.pre('save', function(next) {
  if (this.phone)
    this.phone.replace(/-\(\)\s/,'');
  next();
});

userSchema.index({'locations': 1});
userSchema.index({'locations.plants': 1});

/*userSchema.options.toObject = {
    transform: function(doc, ret, options) {
        ret.id = ret._id;
        ret.image = doc.image.toString('base64');
        return ret;
    }
};

plantSchema.options.toObject = {
    transform: function(doc, ret, options) {
        ret.id = ret._id;
        ret.image = doc.image.toString('base64');
        return ret;
    }
};*/

userSchema.index({ 'locations.latlng': '2dsphere'});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};


module.exports = mongoose.model('User', userSchema);
