import React from 'react';
import SearchReportStore from '../stores/SearchReportStore';
import SearchReportActions from '../actions/SearchReportActions';
import Config from '../config';
import {findWhere} from 'underscore';
import {Button, Popover, OverlayTrigger, Label} from 'react-bootstrap';

class SearchReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = SearchReportStore.getState();
    this.onChange = this.onChange.bind(this);
    this.port = null;
    this.types = [
      {value: "factFinding", name: "Fact Finding", description: "Looking for specific facts, files, particular websites, or pieces of information"},
      {value: "infoGathering", name: "Information Gathering", description: "Information Gathering: Collecting information, often from various sources, in order to make a decision, write a report, complete a project, etc"},
      {value: "browsing", name: "Browsing", description: "Viewing web pages, with no specific goal in mind, often just for entertainment"},
      {value: "transactions", name: "Transaction", description: "An online action, such as email or banking"},
      {value: "other", name: "Other", description: "Doesn't match the above descriptions"}
    ];
  }

  componentDidMount() {
    
    SearchReportStore.listen(this.onChange);
    this.port = chrome.runtime.connect(Config.extensionKey, {name: "decryption"});
    this.port.onDisconnect.addListener( (msg) => {
      SearchReportActions.portDisconnected();
      this.port = null;
    });
    this.port.onMessage.addListener( (msg) => {
      let type = msg.decrypted.type[0].toUpperCase() + msg.decrypted.type.substring(1);
      let success = (msg.err)? 'Fail':'Success';
      SearchReportActions['decrypted'+type+success]({port: this.port, token: this.context.token, decrypted: msg.decrypted}); //Basically, the actions have to be decrypted[Type][Success/Fail](msg)
    });
    SearchReportActions.getTabs(this.context.token, this.port, this.state.limit, 0);
    SearchReportActions.getTasks(this.context.token);
    SearchReportActions.getCounts(this.context.token)
  }

  componentWillUnmount() {
    SearchReportStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  newTask(event) {
    event.preventDefault();
    if (this.state.newTaskName == "" || this.state.newTaskType == "") {
      toastr.error(`Please fill in all fields`);
    } else {
      SearchReportActions.newTask(this.context.token, this.state.newTaskName, this.state.newTaskType);
    }
  }
  
  handleCheck(id, event) {
    SearchReportActions.selectTab({id: id, event: event});
  }

  assignSelected(name) {
    SearchReportActions.assignSelected(this.context.token, this.port, this.state.selectedSearches, name) 
  }
  
  getMore() {
    if (this.state.viewSearches.length < this.state.limit) {
      SearchReportActions.getTabs(this.context.token, this.port, this.state.limit - this.state.viewSearches.length, this.state.viewSearches.length);
    }
  }
  
  render() {
    let searchList = this.state.viewSearches.map((search, index) => {
      return (
        <div key={search._id} className='list-group-item animated fadeIn'>
          <div className='media'>
            <div className='pull-left checkbox'>
              <input type="checkbox" onChange={this.handleCheck.bind(this, search._id)} checked={findWhere(this.state.selectedSearches, {_id: search._id})? true:false} id={index} style={{marginTop: -8, marginLeft: 0}}/>
            </div>
            <div className='media-body' style={{paddingLeft: 10}}>
              <h5 className='media-heading'>
                <label htmlFor={index} className="single-line">{search.title}</label>
              </h5>
            </div>
          </div>
        </div>
      );  
    }); 

    let taskList = this.state.tasks.map((task, index) => {
      return (
        <h3><a onClick={this.assignSelected.bind(this, task.name)}><Label bsStyle="primary"><span className="glyphicons glyphicons-plus">+</span></Label></a> <Label>{task.name}</Label></h3>
      );
    });

    let taskTypes = this.types.map((type, index) => {
      return (
          <div className="radio" key={type.name}>
            <label htmlFor={type.value + "Radio"}>
              <input type="radio" name="taskType" id={type.value + "Radio"} value={type.value} checked={this.state.newTaskType === type.value} onChange={SearchReportActions.updateType} style={{display: 'block'}}/>
              {type.name}
            </label>
          </div>
      );
    });

    let panel = (() => {
      if (this.state.addTask) {
        return (
          <form className="form-horizontal" onSubmit={this.newTask.bind(this)}>
            <div className="form-group">
              <label htmlFor={"taskName"} className="col-sm-2 control-label">Name</label>
              <div className="col-sm-10">
                <input type="text" className="form-control" id="taskName" placeholder="Name" onChange={SearchReportActions.updateName} value={this.state.newTaskName} />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                {taskTypes}
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-2 col-sm-10">
                <button type="button" className="btn btn-default" onClick={SearchReportActions.cancelAddTask}>Cancel</button>&nbsp;
                <button type="submit" className="btn btn-primary">Add</button>
              </div>
            </div>
          </form>
        );
      } else {
        return (
          <Button bsStyle="success" onClick={SearchReportActions.addTask}>Add Task</Button>
        );
      }
    })();

    let types = this.types.map((type, index) => {
      return (
        <p key={type.name}><strong>{type.name}</strong>: {type.description}</p>
      );
    });

    return (
      <div className='container'>
        <div className="row">
          <div className="col-md-8">
            <h4>Remaining: {this.state.todo} / {this.state.total}</h4>
          </div>
          <div className="col-md-4">
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            <div className='list-group'>
              {searchList}
            </div>
          </div>
          <div className="col-md-4">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4 style={{display: 'inline-block'}}className="panel-title">Tasks</h4>
                <OverlayTrigger trigger="click" rootClose placement="left" overlay={<Popover id="takeTypes" title="Task Types">{types}</Popover>}>
                  <Button bsSize="xsmall" style={{display: 'block', float: 'right'}} bsStyle="primary"><strong>?</strong></Button>
                </OverlayTrigger>
              </div>
              <div className="panel-body">
                {taskList}
                {panel}
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8" style={{textAlign: 'center'}}>
            <Button bsStyle="primary" bsSize="large" onClick={this.getMore.bind(this)} style={{width: 400}}>Get More</Button>
          </div>
        </div>
      </div>
    ); 
  }
}

SearchReport.contextTypes = {
  token: React.PropTypes.string.isRequired
}

export default SearchReport;
