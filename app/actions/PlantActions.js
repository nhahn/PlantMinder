import alt from '../alt';
import {assign} from 'underscore';

class PlantActions {
  constructor() {
    this.generateActions(
      'editingImage',
      'deviceFetched',
      'deviceMissed'
    );  
  }
  
  fetchDevice(id) {
    $.ajax({
      type: 'GET',
      url: '/api/plants/'+id+'/device',
    })  
      .done((data) => {
        this.actions.deviceFetched({device: data});
      })  
      .fail((jqXhr) => {
        this.actions.deviceMissed({errorMessage: jqXhr.responseJSON.err});
      }); 
  }

}

export default alt.createActions(PlantActions);
