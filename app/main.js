import React from 'react';
import Router from 'react-router';
import routes from './routes';
import alt from './alt'; 

if (window.ReactGlobals.token) {
  localStorage.setItem('token', window.ReactGlobals.token);
}

File.prototype.convertToBase64 = function(callback){
  var FR= new FileReader();
  FR.onload = function(e) {
       callback(e.target.result)
  };       
  FR.readAsDataURL(this);
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
