import alt from '../alt';
import SignupActions from '../actions/SignupActions';
import AuthActions from '../actions/AuthActions';

class SignupStore {
  constructor() {
    this.bindActions(SignupActions);
    this.email = '';
    this.password = '';
    this.confirmation = '';
    this.emailHelpBlock = '';
    this.passwordHelpBlock = '';
    this.confirmationHelpBlock = '';
    this.emailValidationState = '';
    this.passwordValidationState = '';
    this.confirmationValidationState = '';
    this.passwordScore = 0;
  }
  
  onSignupSuccess(payload) {
    this.nameValidationState = 'has-success';
    this.helpBlock = payload.message;
    AuthActions.authSuccess(payload);
    setTimeout(() =>{ //SUUUPER hacky -- makes sure the auth props can update before the transiton occurs
      payload.router.transitionTo('/',{},{})
    }, 1000);
  }

  onSignupFail(payload) {
    this.status = 'authError';
    this.emailValidationState = 'has-error';
    this.passwordValidationState = 'has-error';
    this.helpBlock = payload.errorMessage;
  }

  onUpdateEmail(event) {
    this.email = event.target.value;
    this.emailValidationState = '';
    this.emailHelpBlock = '';
  }

  onUpdatePassword(event) {
    this.password = event.target.value;
    this.passwordValidationState = '';
    this.passwordHelpBlock = '';
    this.passwordScore = this.scorePassword(this.password);
  }

  onUpdateConfirmation(event) {
    this.confirmation = event.target.value  
    this.confirmationValidationState = '';
    this.confirmationHelpBlock = '';
  }
  
  onInvalidEmail(message) {
    this.emailValidationState = 'has-error';
    this.emailHelpBlock = message;
  }

  onInvalidPassword(message) {
    this.passwordValidationState = 'has-error';
    this.passwordHelpBlock = message;
  }
  
  onInvalidConfirmation(message) {
    this.confirmationValidationState = 'has-error';
    this.confirmationHelpBlock = message; 
  }
  
  scorePassword(pass) {
    let score = 0;
    if (!pass)
        return score;

    // award every unique letter until 5 repetitions
    let letters = new Object();
    for (var i=0; i<pass.length; i++) {
        letters[pass[i]] = (letters[pass[i]] || 0) + 1;
        score += 5.0 / letters[pass[i]];
    }

    // bonus points for mixing it up
    let variations = {
        digits: /\d/.test(pass),
        lower: /[a-z]/.test(pass),
        upper: /[A-Z]/.test(pass),
        nonWords: /\W/.test(pass),
    }

    let variationCount = 0;
    for (var check in variations) {
        variationCount += (variations[check] == true) ? 1 : 0;
    }
    score += (variationCount - 1) * 10;

    return parseInt(score);
  }
  
}

export default alt.createStore(SignupStore);
