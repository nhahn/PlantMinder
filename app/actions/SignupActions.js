import alt from '../alt';
import {assign} from 'underscore';
import AuthActions from '../actions/AuthActions';

class SignupActions {
  constructor() {
    this.generateActions(
      'signupSuccess',
      'signupFail',
      'updateEmail',
      'updatePassword',
      'updateConfirmation',
      'invalidEmail',
      'invalidPassword',
      'invalidConfirmation'
    );  
  }

  signup(payload) {
    $.ajax({
      type: 'POST',
      url: '/auth/signup',
      data: { email: payload.email, password: payload.password }
    })  
      .done((data) => {
        assign(payload, {token: data.token});
        AuthActions.authSuccess(payload);
      })  
      .fail((jqXhr) => {
        assign(payload, {errorMessage: jqXhr.responseJSON.err});
        this.actions.signupFail(payload);
      }); 
  }

}

export default alt.createActions(SignupActions);
