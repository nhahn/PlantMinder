import alt from '../alt';
import ModelActions from '../actions/ModelActions';
import {assign} from 'underscore';

class ModelStore {
  constructor() {
    this.bindActions(ModelActions);
    this.total = 1;
    this.saved = 1;
    this.modelStage = 'setup'; //ENUM of ['setup', 'calculating', 'failed', 'complete']
  }

  onUpdateStatus(data) {
    this.total = data.total;
    this.saved = data.step;
  }

  onStartBuild() {
    this.modelStage = 'calculating';
    this.saved = 0;
    this.total = 1;
  }

  onModelFail(err) {
    this.modelStage = 'failed';
    toastr.error(err.message);
    this.saved = 1;
    this.total = 1;
  }

  onModelComplete(payload) {
    toastr.success("Model Calculation Complete!");
    this.modelStage = 'complete';
    this.saved = this.total;
    let query = payload.router.getCurrentQuery();
    if (query.oldPath) {
      setTimeout(() =>{ //SUUUPER hacky -- makes sure the auth props can update before the transiton occurs
        payload.router.transitionTo(query.oldPath, query.oldParams, query.oldQuery);
      }, 1000);  
    } 
  }

}

export default alt.createStore(ModelStore);
