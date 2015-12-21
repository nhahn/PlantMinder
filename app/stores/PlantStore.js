import alt from '../alt';
import PlantActions from '../actions/PlantActions';
import {assign} from 'underscore';

class PlantStore {
  constructor() {
    this.bindActions(PlantActions);
  }
}

export default alt.createStore(PlantStore);
