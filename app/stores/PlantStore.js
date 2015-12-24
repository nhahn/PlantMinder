import alt from '../alt';
import PlantActions from '../actions/PlantActions';
import {assign} from 'underscore';

class PlantStore {
  constructor() {
    this.bindActions(PlantActions);
    this.editingImage = false;
    this.device = {};
  }
  
  onEditingImage() {
    this.editingImage = true;
  }
  
  onDeviceFetched(payload) {
    this.device = payload.device; 
  }
}

export default alt.createStore(PlantStore);
