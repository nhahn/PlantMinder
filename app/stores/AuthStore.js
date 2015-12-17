import alt from '../alt';
import AuthActions from '../actions/AuthActions';

class AuthStore {
  constructor() {
    this.bindActions(AuthActions);
    this.email = '';
    this.password = '';
    this.helpBlock = '';
    this.emailValidationState = '';
    this.passwordValidationState = '';
    this.token = this.token || null;
    this.loggedIn = this.loggedIn || false;
    this.status = this.status || 'loggedOut' //['loggedOut', 'refreshingToken', 'fetchingToken', 'authError', 'loggedIn']
  }

  onFetchingToken() {
    this.status = 'fetchingToken';
  }
  
  onAuthSuccess(payload) {
    this.nameValidationState = 'has-success';
    this.helpBlock = payload.message;
    this.token = payload.token;
    this.loggedIn = true;
    localStorage.setItem('token', payload.token);
    this.status = 'loggedIn';
    let query = payload.router.getCurrentQuery();
    if (query.oldPath) {
      setTimeout(() =>{ //SUUUPER hacky -- makes sure the auth props can update before the transiton occurs
        payload.router.transitionTo(query.oldPath, query.oldParams, query.oldQuery);
      }, 1000);
    }
  }

  onAuthFail(payload) {
    this.status = 'authError';
    this.emailValidationState = 'has-error';
    this.passwordValidationState = 'has-error';
    this.helpBlock = payload.errorMessage;
  }

  onLogout(payload) {
    this.token = '';
    this.loggedIn = false;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.status = 'loggedOut';
    setTimeout(() =>{ //SUUUPER hacky -- makes sure the auth props can update before the transiton occurs
      payload.router.transitionTo('/');
    }, 1000);
  }
  
  onUpdateEmail(event) {
    this.email = event.target.value;
    this.emailValidationState = '';
    this.helpBlock = '';
  }

  onUpdatePassword(event) {
    this.password = event.target.value;
    this.passwordValidationState = '';
  }

  onInvalidEmail() {
    this.emailValidationState = 'has-error';
    this.helpBlock = 'Please enter a character name.';
  }

  onInvalidPassword() {
    this.passwordValidationState = 'has-error';
    this.helpBlock = '';
  }
  
}

export default alt.createStore(AuthStore);
