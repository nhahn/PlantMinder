import React from 'react';
import {Link} from 'react-router';
import ProfileActions from '../actions/ProfileActions';
import InlineEdit from './InlineEdit';
import sms from 'sms-address';
import {map} from 'underscore';
import Cropper from './Cropper';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: this.props.user.phone || "",
      carrier: this.props.user.carrier || "",
      sms: this.props.user.sms || false,
      error: false,
      helpBlock: ''
    };
  }
  
  validateEmail(email) {
    return (email.match(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i))
  }
  
  validatePhone() {
    if (!this.state.phone.match(/^(\+0?1\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)) {
      this.setState({helpBlock: 'Please enter a valid phone number', error: 'has-error'});
      return false;
    } return true;
  }
  
  updatePhone(event) {
    event.stopPropagation();
    var numbers = event.target.value.replace(/\D/g, ''),
        char = {0:'(',3:') ',6:'-'};
    var phone = '';
    for (var i = 0; i < numbers.length; i++) {
        phone += (char[i]||'') + numbers[i];
    }
    this.setState({phone: phone, helpBlock: '', error: ''});
  }
  
  setCarrier(event) {
    event.stopPropagation();
    this.setState({carrier: event.target.value});
  }
  
  checkBox(event) {
    event.stopPropagation();
    this.setState({sms: event.target.checked});
  }
  
  handleSubmit() {
    event.preventDefault();
    event.stopPropagation();
    
    if (!this.state.carrier)
      return this.setState({helpBlock: 'Please select a carrier', error: 'has-error'});
    
    if (this.validatePhone())
      ProfileActions.savePhone(this.state.phone, this.state.carrier, this.state.sms); 
  }
  
  reset() {
    this.setState({
      phone: this.props.user.phone || "",
      carrier: this.props.user.carrier || "",
      sms: this.props.user.sms || false,
      helpBlock: '', error: ''
    });  
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      phone: nextProps.user.phone || this.state.phone,
      carrier: nextProps.user.carrier || this.state.carrier,
      sms: nextProps.user.sms || this.state.sms
    });  
  }
  
  render() {    
    
    var carriers = map(sms.carriers, (value, key) => {
      return (<option value={value} key={key}>{key}</option>);
    });
      
    return (
      <div>
      <div className="row">
        <div className="col-sm-6">
          <div className="panel panel-default">
            <div className="panel-heading">Picture</div>
            <div className="panel-body">
              <Cropper uploadImage={ProfileActions.updateImage.bind(this)} filler='/img/profile-icon.png' image={this.props.user.image}/>
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="panel panel-default">
            <div className="panel-heading">Profile</div>
            <div className="panel-body">
              <div className="row">
                <div className="col-sm-4">
                  Email: 
                </div>
                <div className="col-sm-8">
                  <InlineEdit className="pull-right" text={this.props.user.local.email || ""} placeholder="Set an Email" validate={this.validateEmail} change={ProfileActions.updateEmail} errorText="Please enter a valid email"/>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-4">
                  Password: 
                </div>
                <div className="col-sm-8">
                  <InlineEdit className="pull-right" text={(this.props.user.local.password)? "••••••••" : "Unset"} placeholder="Set a Password" validate={this.validatePass} change={ProfileActions.updatePassword} errorText="Please enter a valid password"/>
                </div>
              </div> 
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-7">
          <div className="panel panel-default">
            <div className="panel-heading">Phone Information</div>
            <div className="panel-body">
              <form onSubmit={this.handleSubmit.bind(this)}>
                <div className={'form-group ' + this.state.error}>
                  <label className='control-label'>Phone Number</label>
                  <input type='phone' className='form-control' ref='phoneTextField' value={this.state.phone}
                         onChange={this.updatePhone.bind(this)} onBlur={this.validatePhone.bind(this)}/>
                  <span className='help-block'>{this.state.helpBlock}</span>
                </div>
                <select className="form-control" value={this.state.carrier} onChange={this.setCarrier.bind(this)}>
                  <option value="">Select a Carrier</option>
                  {carriers}
                </select>
                <div className="checkbox">
                  <label>
                    <input type="checkbox" checked={this.state.sms} onChange={this.checkBox.bind(this)}/> Send me text message notifications
                  </label>
                </div>
                <button type='submit' className='btn btn-primary btn-space'>Save</button>
                <button type="button" className='btn btn-default' onClick={this.reset.bind(this)}>Reset</button>
              </form>
            </div>
          </div>
        </div>
        <div className="col-sm-5">
          <div className="panel panel-default">
            <div className="panel-heading">Linked Accounts</div>
            <div className="panel-body">
              <div className="row" style={{paddingBottom: 10}}>
                <div className="col-xs-4">
                  Google: 
                </div>
                <div className="col-xs-8">
                  {(() => {
                    if (this.props.user.google && this.props.user.google.token)
                      return (
                        <p>{this.props.user.google.email} <a href="/auth/unlink/google" className='btn' style={{backgroundColor: "#DC4E41", color: "#fff"}}><span className="fa fa-google-plus-square"></span> Unlink</a></p>
                      );
                    else
                      return (<a href="/auth/connect/google" className='btn pull-right' style={{backgroundColor: "#DC4E41", color: "#fff"}}><span className="fa fa-google-plus-square"></span> Connect</a>);
                   })()}
                </div>
              </div>
              <div className="row">
                <div className="col-xs-4">
                  Facebook: 
                </div>
                <div className="col-xs-8">
                  {(() => {
                    if (this.props.user.facebook && this.props.user.facebook.token)
                      return (
                        <p>{this.props.user.facebook.email} <a href="/auth/unlink/facebook" className='btn' style={{backgroundColor: "#3b5998", color: "#fff"}}><span className="fa fa-facebook-square"></span> Unlink</a></p>
                      );
                    else
                      return <a href="/auth/connect/facebook" className='btn pull-right' style={{backgroundColor: "#3b5998", color: "#fff"}}><span className="fa fa-facebook-square"></span> Connect</a>;
                   })()}
                </div>
              </div>    
            </div>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default Profile;