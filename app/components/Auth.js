import React from 'react';
import AuthStore from '../stores/AuthStore'
import AuthActions from '../actions/AuthActions';
import {assign} from 'underscore';

class Auth extends React.Component {

  constructor(props) {
    super(props);
    this.state = AuthStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    AuthStore.listen(this.onChange);
  }

  logOut() {
    AuthAction.logOut()
  }

  componentWillUnmount() {
    AuthStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();

    var email = this.state.email.trim();
    var password = this.state.password;

    if (!email) {
      AuthActions.invalidEmail();
      this.refs.emailTextField.getDOMNode().focus();
    }

    if (!password) {
      AuthActions.invalidPassword();
      this.refs.passwordTextField.getDOMNode().focus();
    }

    if (email && password) {
      AuthActions.auth({router: this.context.router, token: this.state.token, email: email, password: password});
    }
  }
  
  render() {
    let inner = '';
    
    switch (this.state.status) {
      case 'fetchingToken':
        inner = (
          <div className='row'>
            <div className="col-xs-10 col-sm-6 col-sm-offset-3 col-xs-offset-1">
              <div className='thumbnail fadeInUp animated row'>
                <div className="col-xs-12">
                  <h4>Logging You In</h4>
                  <div className="progress">
                    <div className="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: "100%"}}>
                      <span className="sr-only">In Progress</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        )
        break;
      case 'authError':
      case 'loggedOut':
        inner = (
          <div className='row flipInX animated'>
            <div className='col-sm-8'>
              <div className='panel panel-default'>
                <div className='panel-heading'>Log In</div>
                <div className='panel-body'>
                  <form onSubmit={this.handleSubmit.bind(this)}>
                    <div className={'form-group ' + this.state.emailValidationState}>
                      <label className='control-label'>Email</label>
                      <input type='email' className='form-control' ref='emailTextField' value={this.state.email}
                             onChange={AuthActions.updateEmail} autoFocus/>
                    </div>
                    <div className={'form-group ' + this.state.passwordValidationState}>
                      <label className='control-label'>Password</label>
                      <input type='password' className='form-control' ref='passwordTextField' value={this.state.password}
                             onChange={AuthActions.updatePassword} />
                      <span className='help-block'>{this.state.helpBlock}</span>
                    </div>
                    <div className="form-group pull-left">
                      <button type='submit' className='btn btn-primary btn-space'>Submit</button> 
                      <a href="/auth/signup" className='btn btn-default'>Sign Up</a>
                    </div>
                    <div className="form-group pull-right">
                      <a href="/auth/facebook" className='btn btn-space' style={{backgroundColor: "#3b5998", color: "#fff"}}><span className="fa fa-facebook-square"></span> Login</a> 
                      <a href="/auth/google" className='btn' style={{backgroundColor: "#DC4E41", color: "#fff"}}><span className="fa fa-google-plus-square"></span> Login</a>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div> 
        )
        break;
    
    }
    return (
      <div className='container'>
        {inner}
      </div>
    );
  }
      
}

Auth.contextTypes = { 
    router: React.PropTypes.func.isRequired
};

export default Auth;
