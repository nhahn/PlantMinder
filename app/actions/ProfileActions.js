import alt from '../alt';
import {assign} from 'underscore';

class ProfileActions {
  constructor() {
    this.generateActions(
      'updateUser',
      'updateUserFail'
    );  
  }
  
  fetchUser() {
    $.ajax({
      type: 'GET',
      url: '/api/profile',
    })  
      .done((data) => {
        this.actions.updateUser({user: data});
      })  
      .fail((jqXhr) => {
        this.actions.updateUserFail({errorMessage: jqXhr.responseJSON.err});
      }); 
  }
  
  updatePassword(password) {
    $.ajax({
      type: 'POST',
      url: '/api/profile/update/password',
      data: {password: password}
    })
      .done((data) => {
        //Some type of password update success
      })  
      .fail((jqXhr) => {
        assign(payload, {errorMessage: jqXhr.responseJSON.err});
        this.actions.updateUserFail(payload);
      }); 
  }
  
  updateEmail(email) {
    $.ajax({
      type: 'POST',
      url: '/api/profile/update/email',
      data: {email: email}
    })
      .done((data) => {
        this.actions.updateUser({user: data});
    })  
      .fail((jqXhr) => {
        this.actions.updateUserFail({errorMessage: jqXhr.responseJSON.err});
      }); 
  }
  
  updateImage(image) {
    $.ajax({
      type: 'POST',
      url: '/api/profile/update/image',
      data: {image: image}
    })
      .done((data) => {
        this.actions.updateUser({user: data});
    })  
      .fail((jqXhr) => {
        this.actions.updateUserFail({errorMessage: jqXhr.responseJSON.err});
      }); 
  }
  
  savePhone(phone, carrier, sms) {
    $.ajax({
      type: 'POST',
      url: '/api/profile/update/phone',
      data: {phone: phone, carrier: carrier, sms: sms}
    })
      .done((data) => {
        this.actions.updateUser({user: data});
    })  
      .fail((jqXhr) => {
        this.actions.updateUserFail({errorMessage: jqXhr.responseJSON.err});
      }); 
  }

}

export default alt.createActions(ProfileActions);
