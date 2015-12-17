import alt from '../alt';
import SyncActions from '../actions/SyncActions';
import {assign} from 'underscore';

class SyncStore {
  constructor() {
    this.bindActions(SyncActions);
    this.totalRecords = 1;
    this.savedRecords = 1;
    this.syncStage = 'setup'; //ENUM of ['setup', 'syncing', 'failed', 'complete']
    this.stopPoints = {TabInfo: 0, NavInfo: 0, FocusInfo: 0};
  }

  onGetLastSyncSuccess(data) {
    this.stopPoints = data.stopPoints;
  }

  onGetLastSyncFail(err) {
    toastr.error(err.message)
  }

  onUpdateDataCounts(data) {
    this.totalRecords = data.total;
    this.savedRecords = data.stored;
  }

  onStartSync() {
    this.syncStage = 'syncing';
    this.totalRecords = 0;
    this.totalRecords = 1;
  }

  onSyncFail(err) {
    this.syncStage = 'failed';
    toastr.error(err.message);
    this.savedRecords = 1;
    this.totalRecords = 1;
  }

  onCompleteSync(payload) {
    toastr.success("Sync Complete!");
    this.syncStage = 'complete';
    this.savedRecords = this.totalRecords;
    let query = payload.router.getCurrentQuery();
    if (query.oldPath) {
      setTimeout(() =>{ //SUUUPER hacky -- makes sure the auth props can update before the transiton occurs
        payload.router.transitionTo(query.oldPath, query.oldParams, query.oldQuery);
      }, 1000);  
    } 
  }

}

export default alt.createStore(SyncStore);
