import alt from '../alt';
import {assign} from 'underscore';

class AuthActions {
  constructor() {
    this.generateActions(
      'authSuccess',
      'authFail',
      'updateEmail',
      'updatePassword',
      'invalidEmail',
      'invalidPassword',
      'fetchingToken',
      'logout'
    );  
  }

  auth(payload) {
    this.actions.fetchingToken();
    $.ajax({
      type: 'POST',
      url: '/auth/login',
      data: { email: payload.email, password: payload.password }
    })  
      .done((data) => {
        assign(payload, {message: data.message});
        this.actions.authSuccess(payload);
      })  
      .fail((jqXhr) => {
        assign(payload, {errorMessage: jqXhr.responseJSON.err});
        this.actions.authFail(payload);
      }); 
  }

}

export default alt.createActions(AuthActions);
