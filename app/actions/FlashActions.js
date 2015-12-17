import alt from '../alt';

class HomeActions {
  constructor() {
    this.generateActions(
      'clearNotification',
      'addNotification',
      'setNotifications'
    );
  }

}

export default alt.createActions(HomeActions);