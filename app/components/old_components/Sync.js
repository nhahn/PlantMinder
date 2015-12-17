import React from 'react';
import SyncStore from '../stores/SyncStore';
import SyncActions from '../actions/SyncActions';
import Config from '../config';
import AuthActions from '../actions/AuthActions';
import classNames from 'classnames';

class Sync extends React.Component {
  constructor(props) {
    super(props);
    this.state = SyncStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    SyncStore.listen(this.onChange);
    console.log(this.props);
    let socket = io.connect(window.socket_connection+'/sync', {
      transports: ['websocket'],
      query: 'token=' + this.context.token, 
      reconnectionAttempts: 5,
      multiplex: false //This needs to be false for authentication purposes
    });
    //connect to the extension to get the data
    let port = chrome.runtime.connect(Config.extensionKey, {name: 'sync'});
    port.onDisconnect.addListener( (msg) => {
      socket.disconnect();
    });
    port.onMessage.addListener( (msg) => {
      switch (msg.cmd) {
        case 'complete':
          //We've finished the sync here
          AuthActions.updateLastSync({lastSync: msg.time});
          SyncActions.completeSync({router: this.context.router, msg: msg});
          break;
        case 'send':
          socket.emit(msg.table, msg);
          break;
        case 'update':
          SyncActions.updateDataCounts(msg);
          break;
        case 'ready':
          SyncActions.startSync();
          break;
        case 'failture':
          SyncActions.syncFail(msg);
      }
    });

    socket.on('stored', (data) => {
      data.cmd = 'stored';
      port.postMessage(data);
    });
   
    socket.on('complete', (data) => {
      data.cmd = 'complete';
      port.postMessage(data);
    });

    socket.on('error', (data) => {
      SyncActions.syncFail(data);
    });
    SyncActions.getLastSync({token: this.context.token, port: port});
  }

  componentWillUnmount() {
    SyncStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    let percentage = this.state.savedRecords / this.state.totalRecords;
    let progressBar = classNames('progress-bar', {
      'progress-bar-striped active': this.state.syncStage == "syncing" || this.state.syncStage == "setup",
      'progress-bar-success': this.state.syncStage == "complete",
      'progress-bar-danger': this.state.syncStage == "failed"
    });
    return (
      <div className='container'>
        <h3 className='text-center'>{(()=> {
            switch (this.state.syncStage) {
              case 'setup': return "Seting Up Sync";
              case 'syncing': return "Currently Syncing";
              case 'failed': return "Sync Fail";
              case 'complete': return "Sync Complete";
            }
          })()}
        </h3>
        <h5 className='text-center'>Ensuring You're Working with the Latest Data</h5>
        <div className='row'>
          <div className="col-xs-10 col-sm-6 col-sm-offset-3 col-xs-offset-1">
            <div className='thumbnail fadeInUp animated row'>
              <div className="col-xs-12">
                <div className="progress">
                  <div className={progressBar} role="progressbar" aria-valuenow={this.state.savedRecords} aria-valuemin="0" aria-valuemax={this.state.totalRecords} style={{width: (percentage * 100) + "%"}}>
                  </div>
                </div>
                <h5>Last Sync: {(this.props.lastSync == 0)? "Never": new Date(this.props.lastSync).toLocaleString()}</h5>
              </div>
            </div> 
          </div>
        </div>
      </div>
    );
  }
}

Sync.contextTypes = {
  token: React.PropTypes.string.isRequired,
  router: React.PropTypes.func.isRequired
}

export default Sync;
