import React from 'react';
import Router from 'react-router';
import routes from './routes';
import alt from './alt'; 

window.socket_connection = 'wss://'+window.location.host+':8443';

if (window.location.hostname == "localhost")
  window.socket_connection = "localhost:8080";
if (window.location.hostname == "127.0.0.1")
  window.socket_connection = "127.0.0.1:8080";

if (window.ReactGlobals.token) {
  localStorage.setItem('token', window.ReactGlobals.token);
}
  
alt.bootstrap(JSON.stringify({
  AuthStore: {
    token: localStorage.getItem('token') || '', 
    status: (localStorage.getItem('token'))? 'loggedIn':'loggedOut',
    loggedIn: localStorage.getItem('token')? true:false,
  }
}));

Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler />, document.getElementById('app'));
});
