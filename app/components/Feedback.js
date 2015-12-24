import React from 'react';
import {Link} from 'react-router';

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
      check: ''
    }
  }

  componentDidMount() {
    //FooterStore.listen(this.onChange);
  }

  componentWillUnmount() {
    //FooterStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }
  
  updateName(event) {
    this.setState({
      name: event.target.value,
      nameValidationState: '',
      nameHelpBlock: ''
    });
  }
  
  validateName() {
    if (this.state.name == "") {
      this.setState({
        nameValidationState: 'has-error',
        nameHelpBlock: 'Please enter a contact name'
      });
      return false;
    }
    return true;
  }
    
  updateEmail(event) {
    this.setState({
      email: event.target.value,
      emailValidationState: '',
      emailHelpBlock: ''
    });
  }
  
  validateEmail(event) {
    if(!this.state.email.match(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i)) {
      this.setState({emailHelpBlock: "Please enter a valid email address", emailValidationState: 'has-error'})
      return false;
    }
    return true;
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
  
  render() {
    return (
      <div className='container'>
        <div className="row">
          <div className="col-md-12">
            <form role="form" onSubmit={this.handleSubmit.bind(this)}>
              <div className="col-lg-6">
                <div className="well well-sm"><strong><i className="glyphicon glyphicon-ok form-control-feedback" style={{right: 14}}></i> Required Field</strong></div>
                <div className={"form-group " + this.state.nameValidationState}>
                  <label htmlFor="InputName">Your Name</label>
                  <div className="input-group">
                    <input type="text" className="form-control" id="InputName" placeholder="Enter Name" value={this.state.name}
                      onChange={this.updateName.bind(this)} onBlur={this.validateName.bind(this)} autoFocus/>
                    <span className="input-group-addon"><i className="glyphicon glyphicon-ok form-control-feedback" style={{right: -4}}></i></span></div>
                    <span className='help-block'>{this.state.nameHelpBlock}</span>
                </div>
                <div className={"form-group " + this.state.emailValidationState}>
                  <label htmlFor="InputEmail">Your Email</label>
                  <div className="input-group">
                    <input type="email" className="form-control" id="InputEmail" name="InputEmail" placeholder="Enter Email" 
                    value={this.state.email} onChange={this.updateEmail.bind(this)} onBlur={this.validateEmail.bind(this)}/>
                    <span className="input-group-addon"><i className="glyphicon glyphicon-ok form-control-feedback" style={{right: -4}}></i></span></div>
                <span className='help-block'>{this.state.emailHelpBlock}</span></div>
                <div className="form-group">
                  <label htmlFor="InputMessage">Message</label>
                  <div className="input-group">
                    <textarea name="InputMessage" id="InputMessage" className="form-control" rows="5" required></textarea>
                    <span className="input-group-addon"><i className="glyphicon glyphicon-ok form-control-feedback" style={{right: -4}}></i></span></div>
                </div>
                <div className="form-group">
                  <label htmlFor="InputReal">What is 4+3? (Simple Spam Checker)</label>
                  <div className="input-group">
                    <input type="text" className="form-control" name="InputReal" id="InputReal" required/>
                    <span className="input-group-addon"><i className="glyphicon glyphicon-ok form-control-feedback" style={{right: -4}}></i></span></div>
                </div>
                <input type="submit" name="submit" id="submit" value="Submit" className="btn btn-info pull-right"/>
              </div>
            </form>
            <hr className="featurette-divider hidden-lg"/>
            <div className="col-lg-5 col-md-push-1">
              <address>
              <h3>Contact Information</h3>
              <p className="lead"><a href="#">Nathan Hahn<br/>
              Carnegie Mellon University<br/>
                HCII Department, RM 2501C</a><br/>
                Phone: 703-587-3175</p>
              </address>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Feedback;