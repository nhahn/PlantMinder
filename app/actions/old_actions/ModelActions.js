import alt from '../alt';
import {assign} from 'underscore';

class SyncActions {
  constructor() {
    this.generateActions(
      'updateStatus',
      'modelComplete',
      'startSync',
      'modelFail',
      'startBuild'
    );
  }
}

export default alt.createActions(SyncActions);
