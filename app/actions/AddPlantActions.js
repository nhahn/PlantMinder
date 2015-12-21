import alt from '../alt';
import {assign} from 'underscore';

class AddPlantActions {
  constructor() {
    this.generateActions(
      'updateId',
      'invalidId',
      'associateSuccess',
      'associateFail'
    );  
  }

  associateDevice(payload) {
    $.ajax({
      type: 'POST',
      url: 'api/plants/associate',
      data: { uuid: payload.id }
    })  
      .done((data) => {
        this.actions.associateSuccess(payload);
      })  
      .fail((jqXhr) => {
        assign(payload, {errorMessage: jqXhr.responseJSON.err});
        this.actions.associateFail(payload);
      }); 
  }
}

export default alt.createActions(AddPlantActions);
