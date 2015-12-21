import alt from '../alt';
import AddPlantActions from '../actions/AddPlantActions';
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
  
  onAssociateSuccess(payload) {
    //Redirect to our new plant!
    setTimeout(() =>{ //SUUUPER hacky -- makes sure the auth props can update before the transiton occurs
      payload.router.transitionTo('/plant/' + payload.id);
    }, 1000);
  }
  
  onAssociateFail(payload) {
    this.idValidationState = 'has-error';
    this.helpBlock = payload.errorMessage;
  }
}

export default alt.createStore(AddPlantStore);
