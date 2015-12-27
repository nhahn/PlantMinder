import React from 'react';
import Router from 'react-router';
import routes from './routes';
import alt from './alt'; 

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

(function() {
  window.addEventListener('load', function() {  
  //  pushButton.addEventListener('click', function() {  
  //    if (isPushEnabled) {  
  //      unsubscribe();  
  //    } else {  
  //      subscribe();  
  //    }  
  //  });

    // Check that service workers are supported, if so, progressively  
    // enhance and add push messaging support, otherwise continue without it.  
    if ('serviceWorker' in navigator) {  
      navigator.serviceWorker.register('/service-worker.js')  
      .then(initialiseState);  
    } else {  
      console.warn('Service workers aren\'t supported in this browser.');
      alt.bootstrap(JSON.stringify({
        NotificationStore: {
          enabled: false, 
          subscribed: false,
          disableMessage: "Service workers aren\'t supported in this browser."
        }
      }));
    }  
  });

  // Once the service worker is registered set the initial state  
  function initialiseState() {  
    // Are Notifications supported in the service worker?  
    if (!('showNotification' in ServiceWorkerRegistration.prototype)) {  
      console.warn('Notifications aren\'t supported.');  
      return alt.bootstrap(JSON.stringify({
        NotificationStore: {
          enabled: false, 
          subscribed: false,
          disabledMessage: "Notifications aren\'t supported."
        }
      }));
    }

    // Check the current Notification permission.  
    // If its denied, it's a permanent block until the  
    // user changes the permission  
    if (Notification.permission === 'denied') {  
      console.warn('The user has blocked notifications.');  
      return alt.bootstrap(JSON.stringify({
        NotificationStore: {
          enabled: false, 
          subscribed: false,
          disabledMessage: "The user has blocked notifications."
        }
      })); 
    }

    // Check if push messaging is supported  
    if (!('PushManager' in window)) {  
      console.warn('Push messaging isn\'t supported.');  
      return alt.bootstrap(JSON.stringify({
        NotificationStore: {
          enabled: false, 
          subscribed: false,
          disabledMessage: "Push messaging isn\'t supported."
        }
      }));
    }

    // We need the service worker registration to check for a subscription  
    navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {  
      // Do we already have a push message subscription?  
      serviceWorkerRegistration.pushManager.getSubscription()  
        .then(function(subscription) {  
          // Enable any UI which subscribes / unsubscribes from  
          // push messages.  
          if (subscription) {  
            // Keep your server in sync with the latest subscriptionId
            sendSubscriptionToServer(subscription);
          }

          // Set your UI to show they have subscribed for  
          // push messages  
          alt.bootstrap(JSON.stringify({
            NotificationStore: {
              enabled: true, 
              subscribed: (subscription)? true : false
            }
          }));
        })  
        .catch(function(err) {  
          console.warn('Error during getSubscription()', err);  
        });  
    });  
  }
})();
  
Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler />, document.getElementById('app'));
});
