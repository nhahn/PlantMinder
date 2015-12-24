import React from 'react';
import {RouteHandler} from 'react-router';
import Footer from './Footer';
import Navbar from './Navbar';
import AuthStore from '../stores/AuthStore';
import AuthActions from '../actions/AuthActions';
import {assign} from 'underscore';
import HomeActions from '../actions/HomeActions';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = AuthStore.getState(); 
    this.onChange = this.onChange.bind(this);
  }
 
  componentDidMount() {
    AuthStore.listen(this.onChange);

    //Allows us to put our AuthStore token into our ajax requests
    $.ajaxSetup({
      beforeSend: (jqXHR) => {
        if (this.state.loggedIn) {
          jqXHR.setRequestHeader('Authorization', 'JWT ' + this.state.token)
        }
      }
    });

    //If we ever get an authorization error, automatically redirect us to
    //the login page
    $(document).ajaxError((event, jqXHR, ajaxSettings, thrownError) => {
      if (jqXHR.status == 401) {
        console.log("Token authentication error");
        console.log(currentPath);
        let currentPath = this.context.router.getCurrentPathname();
        AuthActions.logout()
        this.context.router.transitionTo('/auth');
      }
    });
    
    $(document).ajaxComplete(function(event, xhr, settings) {
      var _raw_messages = xhr.getResponseHeader("X-FlashMessages");
      if (_raw_messages) {
        var messages = JSON.parse(_raw_messages);
        messages.forEach( message => {
          toastr[message[1]](message[0]);
        });
      }
    });
  }
  
  componentWillUnmount() {
    AuthStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }
 
  getChildContext() {
    return {
      token: this.state.token,
    }
  }
  
  render() {
    return (
      <div>
        <Navbar /> 
        <RouteHandler /> 
        <Footer />
      </div>
    );
  }
}
//Tookout <Footer />

App.childContextTypes = {
  token: React.PropTypes.string.isRequired,
}

App.contextTypes = { 
  router: React.PropTypes.func.isRequired
};

export default App;
