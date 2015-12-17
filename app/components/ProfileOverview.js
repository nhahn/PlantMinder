import React from 'react';
import {Link} from 'react-router';
import ProfileActions from '../actions/ProfileActions';
import InlineEdit from './InlineEdit';

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }
  
  validateEmail(email) {
    return (email.match(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i))
  }
  
  render() {    
    return (
      <div className="row">
        <div className="col-sm-6">
          <div className="panel panel-default">
            <div className="panel-heading">Profile</div>
            <div className="panel-body">
              Email: <InlineEdit className="pull-right" text={this.props.user.local.email || ""} placeholder="Set an Email" validate={this.validateEmail} change={ProfileActions.updateEmail} errorText="Please enter a valid email"/>
              Password: 
            </div>
          </div>
        </div>
        <div className="col-sm-6">
          <div className="panel panel-default">
            <div className="panel-heading">Linked Accounts</div>
            <div className="panel-body">
              
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;