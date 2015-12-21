import alt from '../alt';
import ProfileActions from '../actions/ProfileActions';
import _ from 'underscore';

class ProfileStore {
  constructor() {
    this.bindActions(ProfileActions);
    this.user = null;
  }
  
  onUpdateUser(payload) {
    if (this.user)
      this.deepExtend(this.user, payload.user);
    else
      this.user = payload.user;
  }
  
  updateUserFail(err) {
    console.log(err.errorMessage); 
  }
  
  deepExtend(obj) {
    var self = this;
    var parentRE = /#{\s*?_\s*?}/,
    slice = Array.prototype.slice;

    _.each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        if (_.isUndefined(obj[prop]) || _.isFunction(obj[prop]) || _.isNull(source[prop]) || _.isDate(source[prop])) {
          obj[prop] = source[prop];
        }
        else if (_.isString(source[prop]) && parentRE.test(source[prop])) {
          if (_.isString(obj[prop])) {
            obj[prop] = source[prop].replace(parentRE, obj[prop]);
          }
        }
        else if (_.isArray(obj[prop]) || _.isArray(source[prop])){
          if (!_.isArray(obj[prop]) || !_.isArray(source[prop])){
            throw new Error('Trying to combine an array with a non-array (' + prop + ')');
          } else {
            obj[prop] = _.reject(self.deepExtend(_.clone(obj[prop]), source[prop]), function (item) { return _.isNull(item);});
          }
        }
        else if (_.isObject(obj[prop]) || _.isObject(source[prop])){
          if (!_.isObject(obj[prop]) || !_.isObject(source[prop])){
            throw new Error('Trying to combine an object with a non-object (' + prop + ')');
          } else {
            obj[prop] = self.deepExtend(_.clone(obj[prop]), source[prop]);
          }
        } else {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  }
}

export default alt.createStore(ProfileStore);
