import React from 'react';
import {Route, Redirect, DefaultRoute, IndexRoute} from 'react-router';
import {GuardRoute, GuardRouteAsync} from './guards';
import {assign} from 'underscore';
import App from './components/App';
import Home from './components/Home';
import Auth from './components/Auth';
import AuthStore from './stores/AuthStore';
import Signup from './components/Signup';

import Plants from './components/Plants';
import PlantList from './components/PlantList';
import Plant from './components/Plant';
import Feedback from './components/Feedback';

import Profile from './components/Profile';
import ProfileOverview from './components/ProfileOverview';
import ProfileEdit from './components/ProfileEdit';
import ProfileNotifications from './components/ProfileNotifications';

import AddPlant from './components/AddPlant';

//Verify token here??

var requireAuth = GuardRoute.bind(this, () => {
  return AuthStore.getState().loggedIn
});

/* var isUserLoggedIn = GuardRouteAsync.bind(this, () => {
    console.log("Protected route!")
    let state = AuthStore.getState();
    if (state.loggedIn) return Promise.resolve(true);
    return $.ajax({
      url: '/api/auth/verifyToken',
      data: {token: state.token},
      method: "POST"
    }).then((data) => AuthStore.onRefreshTokenSuccess(data));
  });
*/

let routes = (
  <Route handler={App} path="/">
    <DefaultRoute handler={Home} />
    <Route path='auth'>
      <DefaultRoute handler={Auth} name="auth"/>
      <Route path="signup" handler={Signup} />
      <Route path="google/callback" handler={Home}/>
      <Route path="facebook/callback" handler={Home}/>
    </Route>
    <Route path="addPlant" handler={AddPlant}/>
    <Route path="plants" handler={Plants}>
      <DefaultRoute handler={PlantList}/>
      <Route path="/plant/:id" handler={Plant}/>
    </Route>
    <Route path="profile" handler={Profile}>
      <DefaultRoute handler={ProfileOverview}/>
      <Route path="overview" handler={ProfileEdit}/>
      <Route path="notifications" handler={ProfileNotifications}/>
    </Route>
    <Route path="feedback" handler={Feedback}/>
  </Route>
);

export default routes
