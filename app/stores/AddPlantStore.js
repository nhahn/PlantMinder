import alt from '../alt';
import AddPlantActions from '../actions/FlashActions';
import {assign} from 'underscore';

class AddPlantStore {
  constructor() {
    this.bindActions(AddPlantActions);
    this.sensorID = '';
    this.idValidationState = '';
    this.helpBlock = '';
  }

  onUpdateId(event) {
    this.sensorID = event.target.value;
    this.idValidationState = '';
    this.helpBlock = '';
  }
  
  onInvalidId() {
    this.idValidationState = 'has-error';
    this.helpBlock = 'Please enter a valid sensor ID';
  }
}

export default alt.createStore(AddPlantStore);
