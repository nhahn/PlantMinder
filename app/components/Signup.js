import React from 'react';
import SignupStore from '../stores/SignupStore'
import SignupActions from '../actions/SignupActions';
import {assign} from 'underscore';

class Signup extends React.Component {

  constructor(props) {
    super(props);
    this.state = SignupStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    SignupStore.listen(this.onChange);
  }

  logOut() {
    AuthAction.logOut()
  }

  componentWillUnmount() {
    SignupStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    var email = this.state.email.trim();
    var password = this.state.password;

    if (!email) {
      SignupActions.invalidEmail();
      this.refs.emailTextField.getDOMNode().focus();
    }

    if (!password) {
      SignupActions.invalidPassword();
      this.refs.passwordTextField.getDOMNode().focus();
    }

    if (email && password) {
      SignupActions.signup({router: this.context.router, token: this.state.token, email: email, password: password});
    }
  }
  
  validateEmail(event) {
    if(!this.state.email.match(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i))
      SignupActions.invalidEmail("Please enter a valid email address");
  }
  
  validatePassword(event) {
    if (this.state.password != this.state.confirmation)
      SignupActions.invalidConfirmation("Password and confirmation must match");
  }
  
  checkPassStrength() {
    var score = this.state.passwordScore;
    if (score > 80)
        return ["Strong", "success"];
    if (score > 60)
        return ["Good", "info"];
    if (score >= 30)
        return ["Weak", "warning"];
    
    return ["Invalid", "danger"];
  }
  
  render() {
    return (
      <div className='container'>
        <div className='row flipInX animated'>
          <div className='col-sm-offset-1 col-sm-10'>
            <div className='panel panel-default'>
              <div className='panel-heading'>Log In</div>
              <div className='panel-body'>
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <div className={'form-group ' + this.state.emailValidationState? this.state.emailValidationState : ''}>
                    <label className='control-label'>Email</label>
                    <input type='email' className='form-control' ref='emailTextField' value={this.state.email}
                           onChange={SignupActions.updateEmail} onBlur={this.validateEmail.bind(this)} autoFocus/>
                    <span className='help-block'>{this.state.emailHelpBlock}</span>
                  </div>
                  <div className="row">
                    <div className="col-sm-8">
                      <div className={'form-group ' + this.state.passwordValidationState? this.state.passwordValidationState : ''}>
                        <label className='control-label'>Password</label>
                        <input type='password' className='form-control' ref='passwordTextField' value={this.state.password}
                               onChange={SignupActions.updatePassword} onBlur={this.validatePassword.bind(this)}/>
                        <span className='help-block'>{this.state.passwordHelpBlock}</span>
                      </div>
                      <div className={'form-group ' + this.state.confirmationValidationState? this.state.confirmationValidationState : ''}>
                        <label className='control-label'>Password Confirmation</label>
                        <input type='password' className='form-control' ref='passwordTextField' value={this.state.confirmation}
                               onChange={SignupActions.updateConfirmation} onBlur={this.validatePassword.bind(this)}/>
                        <span className='help-block'>{this.state.confirmationHelpBlock}</span>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <h5>Password Strength</h5>
                      <div className="progress">
                        <div className={'progress-bar progress-bar-' + this.checkPassStrength()[1]} role="progressbar" aria-valuenow={this.state.passwordScore} aria-valuemin="0" aria-valuemax="100" style={{width: this.state.passwordScore + "%"}}>
                        </div>
                      </div>
                      <span>{this.checkPassStrength()[0]}</span>
                    </div>
                  </div>
                  <button type='submit' className='btn btn-primary'>Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div> 
      </div>
    )
  }
      
}

Signup.contextTypes = { 
    router: React.PropTypes.func.isRequired
};

export default Signup;
