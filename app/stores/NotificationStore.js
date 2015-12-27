import alt from '../alt';
import NotificationActions from '../actions/NotificationActions';

class NotificationStore {
  constructor() {
    this.bindActions(NotificationActions);

  }

}

export default alt.createStore(NotificationStore);
