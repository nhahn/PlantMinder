import alt from '../alt';
import FlashActions from '../actions/FlashActions';
import {assign} from 'underscore';

class FlashStore {
  constructor() {
    this.bindActions(FlashActions);
    this.messages = [];
  }

  onClearNotification(index) {
    this.messages.splice(index, 1); 
  }

  onAddNotification(message) {
    this.messages.push(message); 
  }
  
  onSetNotifications(messages) {
    this.messages = messages; 
  }
  
}

export default alt.createStore(ModelStore);
