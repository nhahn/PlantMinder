import React from 'react';
import {Link} from 'react-router';
import NavbarStore from '../stores/NavbarStore';
import NavbarActions from '../actions/NavbarActions';
import HomeActions from '../actions/HomeActions';
import HomeStore from '../stores/HomeStore';
import AuthStore from '../stores/AuthStore';
import AuthActions from '../actions/AuthActions';
import createActiveRouteComponent from 'react-router-active-component';

function getStateFromStores() {
  return {
    navbar: NavbarStore.getState(),
    loggedIn: AuthStore.getState().loggedIn
  }
}

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = getStateFromStores();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    NavbarStore.listen(this.onChange);
    AuthStore.listen(this.onChange);

    let socket = io.connect({
     transports: ['websocket'] 
    });

    socket.on('onlineUsers', (data) => {
      NavbarActions.updateOnlineUsers(data);
    });

    $(document).ajaxStart(() => {
      NavbarActions.updateAjaxAnimation('fadeIn');
    });

    $(document).ajaxComplete(() => {
      setTimeout(() => {
        NavbarActions.updateAjaxAnimation('fadeOut');
      }, 750);
    });
  }

  componentWillUnmount() {
    NavbarStore.unlisten(this.onChange);
    AuthStore.listen(this.onChange);
  }

  onChange(state) {
    this.setState(getStateFromStores());
  }
  
  logout(event) {
    AuthActions.logout({router: this.context.router}); 
  }

  render() {

    let loggedIn = "";
    let NavLink = createActiveRouteComponent('li');
    let links = "";

    if (this.state.loggedIn) {
      loggedIn = <p className="navbar-text navbar-right"><a onClick={this.logout.bind(this)} className="navbar-link">Logout</a></p>; 
      links = (
        <ul className='nav navbar-nav'>
          <NavLink to='/'>Home</NavLink>
          <NavLink to="/plants">Plants</NavLink>
          <NavLink to="/addPlant">Add a Sensor</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to='/feedback'>Feedback</NavLink>
        </ul>
      );
    } else {
      loggedIn = <p className="navbar-text navbar-right"><a href="/auth" className="navbar-link">Sign In</a></p>;
      links = (
        <ul className='nav navbar-nav'>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/feedback'>Feedback</NavLink>
        </ul>
      );
    }

    return (
      <nav className='navbar navbar-default navbar-static-top'>
        <div className='navbar-header'>
          <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar'>
            <span className='sr-only'>Toggle navigation</span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
            <span className='icon-bar'></span>
          </button>
          <Link to='/' className='navbar-brand'>
            <span ref='triangles' className={'triangles animated ' + this.state.ajaxAnimationClass}>
              <div className='tri invert'></div>
              <div className='tri invert'></div>
              <div className='tri'></div>
              <div className='tri invert'></div>
              <div className='tri invert'></div>
              <div className='tri'></div>
              <div className='tri invert'></div>
              <div className='tri'></div>
              <div className='tri invert'></div>
            </span>
            <img alt="Plant Minder" src="/img/plant_minder_logo.png" style={{height: 38, marginTop: -11}}/>
            <span className='badge badge-up badge-danger'>{this.state.onlineUsers}</span>
          </Link>
        </div>
        <div id='navbar' className='navbar-collapse collapse'>
          {links}
          {loggedIn}
        </div>
      </nav>
    );
  }
}

Navbar.contextTypes = {
  router: React.PropTypes.func.isRequired,
};

export default Navbar;
