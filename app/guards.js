import React from 'react';
import {Component} from 'react';

/**
 * Guard the Component router handler with the given function.  If the function fails
 * (i.e. returns a falsey value) then redirect to the given state and parameters.
 *
 * @param fn The guard function, returning true (if the transition is allowed) or false if not
 * @param Component The React component used as the route handler
 * @param state The name of the state to redirect to if the guard fails
 * @param params Optional parameters for the redirect state
 * @returns {*}
 */
var guardRoute = function(fn, Component, { state, params = {} }) {
  return class Authenticated extends React.Component {
    static willTransitionTo(transition, currentParams, currentQuery) {
      if (!fn(currentParams, currentQuery)) {
        let query = {
          oldPath: transition.path,
          oldQuery: currentQuery,
          oldParams: currentParams
        };
        transition.redirect(state, params, query);
      }
    }
    render() {
          return <Component {...this.props} />;
    }
  }
}

 
/**
 * Asynchronously guard the Component router handler with the given function.  If the
 * function fails (i.e. the Promise resolves with a falsey value) then redirect to
 * the given state and parameters.
 *
 * @param fn The guard function, returning a Promise
 * @param Component The React component used as the route handler
 * @param state The name of the state to redirect to if the guard fails
 * @param params Optional parameters for the redirect state
 * @returns {*}
 */
var guardRouteAsync = function(fn, Component, { state, params = {} }) {
  return class Authenticated extends React.Component {
    static willTransitionTo(transition, currentParams, currentQuery, callback) {
      return fn(currentParams, currentQuery).then(result => {
          if (!result) { 
            let query = {
              oldPath: transition.path,
              oldQuery: currentQuery,
              oldParams: currentParams
            };
            transition.redirect(state, params, query);
          }
          callback();
      });
    }
    render() {
          return <Component {...this.props} />;
    }
  }
}

export {guardRoute as GuardRoute, guardRouteAsync as GuardRouteAsync}
