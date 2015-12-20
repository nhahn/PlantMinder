import alt from '../alt';
import {assign} from 'underscore';

class AddPlantActions {
  constructor() {
    this.generateActions(
      'invalidId',
      'updateId'
    );  
  }

}

export default alt.createActions(AddPlantActions);
