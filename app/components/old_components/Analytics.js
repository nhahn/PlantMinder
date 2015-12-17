import React from 'react';
import {RouteHandler} from 'react-router';
import Sidebar from './Sidebar';

class Analytics extends React.Component {

  render() {
    return (
      <div className='container-fluid'> 
        <div class="col-sm-3 col-md-2 sidebar">
          <Sidebar />
        </div>
        <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          <RouteHandler />
        </div>
      </div>
    );
  }
}

export default Analytics;
