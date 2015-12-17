import React from 'react';
import {Link} from 'react-router';
import ProfileStore from '../stores/ProfileStore';
import ProfileActions from '../actions/ProfileActions';
import createActiveRouteComponent from 'react-router-active-component';
import {RouteHandler} from 'react-router';


class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = ProfileStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ProfileStore.listen(this.onChange);
    $(function() {ProfileActions.fetchUser();});
  }

  componentWillUnmount() {
    ProfileStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    let NavLink = createActiveRouteComponent('li');
    
    return (
      <div className='container'>
        <div className="row">
          <div className="col-sm-offset-3 col-sm-3">
            <h3>Your Profile</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3">
            <ul className="nav nav-pills nav-stacked">
              <NavLink to="/profile">Overview</NavLink>
              <NavLink to="/profile/edit">Edit Profile</NavLink>
              <NavLink to="/profile/notifications">Notifications</NavLink>
            </ul>
          </div>
          <div className="col-sm-9">
            {(() => {
              if (this.state.user)
                return <RouteHandler user={this.state.user}/>
              else
                return(
                  <div className='thumbnail fadeInUp animated row'>
                    <div className="col-xs-12">
                      <h4>Fetching Profile</h4>
                      <div className="progress">
                        <div className="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: "100%"}}>
                          <span className="sr-only">In Progress</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
            })()}
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;