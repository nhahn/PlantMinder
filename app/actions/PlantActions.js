import alt from '../alt';
import {assign} from 'underscore';

class PlantActions {
  constructor() {
    this.generateActions(
      'deviceFetched',
      'deviceMissed',
      'recordsRetreived',
      'recordsError',
      'chartRange',
      'tempScale'
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
    
  fetchRecords(id, frame) {
    $.ajax({
      type: 'GET',
      url: '/api/stats/'+id+"/"+frame,
    })  
      .done((data) => {
        this.actions.recordsRetreived(data);
      })  
      .fail((jqXhr) => {
        this.actions.recordsError({errorMessage: jqXhr.responseJSON.err});
      });
  }

}

export default alt.createActions(PlantActions);
