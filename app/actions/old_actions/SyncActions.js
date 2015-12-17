import alt from '../alt';
import {assign} from 'underscore';

class SyncActions {
  constructor() {
    this.generateActions(
      'updateDataCounts',
      'completeSync',
      'startSync',
      'syncFail',
      'getLastSyncSuccess',
      'getLastSyncFail'
    );
  }

  getLastSync(payload) {
    $.ajax({
      type: 'GET',
      url: '/auth/lastSync',
      data: {token: payload.token}
    }).done(data => {
      this.actions.getLastSyncSuccess(data);
      if (payload.port)
        payload.port.postMessage({cmd: 'start', stopPoints: data.stopPoints});
    }).fail(jqXhr => {
      this.actions.getLastSyncFail(jqXhr.responseJSON.message);
    });
  }
}

export default alt.createActions(SyncActions);
