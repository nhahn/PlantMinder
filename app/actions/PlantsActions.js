import alt from '../alt';
import {assign} from 'underscore';

class PlantsActions {
  constructor() {
    this.generateActions(
      'plantsGathered',
      'plantsDropped',
      'setCurrentLocation',
      'imageUpdated',
      'imageFailed',
      'updateSuccess',
      'updateFail'
    );  
  }
  
  fetchPlants() {
    $.ajax({
      type: 'GET',
      url: '/api/plants',
    })  
      .done((data) => {
        this.actions.plantsGathered({locations: data});
      })  
      .fail((jqXhr) => {
        this.actions.plantsDropped({errorMessage: jqXhr.responseJSON.err});
      }); 
  }
  
  updateName(location, plant, name) {
    this.actions.updatePlant(location, plant, {name: name}); 
  }
  
  updateType(location, plant, type) {
    this.actions.updatePlant(location, plant, {type: type}); 
  }
  
  updatePlant(location, plant, update) {
      $.ajax({
      type: 'POST',
      url: '/api/plants/'+location._id+'/'+plant._id+'/update',
      data: update
    })  
      .done((data) => {
        this.actions.updateSuccess({location: location, plant: data});
      })  
      .fail((jqXhr) => {
        this.actions.updateFail({errorMessage: jqXhr.responseJSON.err});
      });
  }
  
  uploadImage(location, plant, image) {
    $.ajax({
      type: 'PUT',
      url: '/api/plants/'+location._id+'/'+plant._id+'/image',
      data: {image: image}
    })  
      .done((data) => {
        this.actions.imageUpdated({location: location, plant: plant, image: image});
      })  
      .fail((jqXhr) => {
        this.actions.imageFailed({errorMessage: jqXhr.responseJSON.err});
      });
  }

}

export default alt.createActions(PlantsActions);
