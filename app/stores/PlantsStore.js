import alt from '../alt';
import PlantsActions from '../actions/PlantsActions';
import {findWhere, findIndex} from 'underscore';

class PlantsStore {
  constructor() {
    this.bindActions(PlantsActions);
    this.locations = [];
    this.currentLocation = null;
    this.loadError = '';
  }
  
  onPlantsGathered(payload) {
    this.locations = payload.locations;
    this.currentLocation = this.locations[0];
  }
  
  onPlantsDropped(err) {
    this.loadError = err.errorMessage;
  }
  
  onSetCurrentLocation(location) {
    this.currentLocation = location;
  }
  
  onImageUpdated(payload) {
    var location = findWhere(this.locations, {_id: payload.location._id});
    var plant = findIndex(location.plants, {_id: payload.plant._id});
    location.plants[plant].image = payload.image;
  }
  
  onImageFailed(err) {
    this.loadError = err.errorMessage;
  }
  
  onUpdateSuccess(payload) {
    var location = findWhere(this.locations, {_id: payload.location._id});
    var plant = findIndex(location.plants, {_id: payload.plant._id});
                                
    payload.image = location.plants[plant].image;
    location.plants[plant] = payload.plant;
  }
  
  onUpdateFail(err) {
    this.loadError = err.errorMessage;
  }
  
}

export default alt.createStore(PlantsStore);
