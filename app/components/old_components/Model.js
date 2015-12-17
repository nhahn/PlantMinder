import React from 'react';
import ModelStore from '../stores/ModelStore';
import ModelActions from '../actions/ModelActions';
import Config from '../config';
import classNames from 'classnames';
import {assign} from 'underscore';

class Model extends React.Component {
  constructor(props) {
    super(props);
    this.state = ModelStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ModelStore.listen(this.onChange);
    console.log(this.props);
    let socket = io.connect(window.socket_connection+'/model', {
      transports: ['websocket'],
      query: 'token=' + this.context.token, 
      reconnectionAttempts: 5,
      multiplex: false //This needs to be false for authentication purposes
    });
    socket.on('update', (data) => {
      ModelActions.updateStatus(data);
    });
   
    socket.on('complete', (data) => {
      assign(data, {router: this.context.router});
      ModelActions.modelComplete(data);
    });

    socket.on('error', (data) => {
      ModelActions.modelFail(data);
    });
    socket.emit('start',{});
    ModelActions.startBuild();
  }

  componentWillUnmount() {
    ModelStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    let percentage = this.state.saved / this.state.total;
    let progressBar = classNames('progress-bar', {
      'progress-bar-striped active': this.state.modelStage == "calculating" || this.state.modelStage == "setup",
      'progress-bar-success': this.state.modelStage == "complete",
      'progress-bar-danger': this.state.modelStage == "failed"
    });
    return (
      <div className='container'>
        <h3 className='text-center'>{(()=> {
            switch (this.state.modelStage) {
              case 'setup': return "Seting Up Model";
              case 'syncing': return "Computing Tab Model";
              case 'failed': return "Model Calculation Fail";
              case 'complete': return "Model Complete";
            }
          })()}
        </h3>
        <h5 className='text-center'>Creating a Model from your Tab Data</h5>
        <div className='row'>
          <div className="col-xs-10 col-sm-6 col-sm-offset-3 col-xs-offset-1">
            <div className='thumbnail fadeInUp animated row'>
              <div className="col-xs-12">
                <div className="progress">
                  <div className={progressBar} role="progressbar" aria-valuenow={this.state.saved} aria-valuemin="0" aria-valuemax={this.state.total} style={{width: (percentage * 100) + "%"}}>
                  </div>
                </div>
                <h5>Last Model: {(this.props.lastModel == 0)? "Never": new Date(this.props.lastModel).toLocaleString()}</h5>
              </div>
            </div> 
          </div>
        </div>
      </div>
    );
  }
}

Model.contextTypes = {
  token: React.PropTypes.string.isRequired,
  router: React.PropTypes.func.isRequired
}

export default Model;
