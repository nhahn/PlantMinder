import alt from '../alt';
import SearchReportActions from '../actions/SearchReportActions';
import {find, contains, findWhere, findIndex} from 'underscore';

class SearchReportStore {
  constructor() {
    this.bindActions(SearchReportActions);
    this.viewSearches = [];
    this.selectedSearches = [];
    this.tasks = [];
    this.taskMap = {};
    this.status = 'downloading' //['downloading', 'decrypting', 'displaying'];
    this.responses = 0;
    this.page = 0;
    this.limit = 30;
    this.addTask = false;
    this.newTaskName = "";
    this.newTaskType = "";
    this.todo = 0;
    this.total = 0;
  }
  
  onAddTask(event) {
    event[0].preventDefault();
    this.addTask = true; 
  }
  
  onAssignSuccess(payload) {
    this.selectedSearches.forEach((search) => {
      this.viewSearches.splice(findIndex(this.viewSearches, {_id: search._id}), 1);
      this.taskMap[search.urlHash] = payload.task;
    });
    this.responses -= payload.selected.length;
    this.todo -= payload.selected.length;
    //SearchReportActions.getTabs(payload.token, payload.port, payload.selected.length, this.limit - payload.selected.length);
    this.selectedSearches = [];
  }

  onNewTaskSuccess(data) {
    this.tasks.push(data);
    this.addTask = false;
    this.newTaskName = "";
    this.newTaskType = "";
  }
  
  onNewTaskFail(data) {
     toastr.error(`Error Making Task:\n${errorMessage}`);
  }
  
  onCancelAddTask(event) {
    event[0].preventDefault();
    this.newTaskName = "";
    this.newTaskType = "";
    this.addTask = false;
    this.newTask
  }
  
  onUpdateName(event) {
    this.newTaskName = event.target.value;
  }

  onUpdateType(event) {
    this.newTaskType = event.target.value;
  }
  
  onGetTasksSuccess(data) {
    this.tasks = data;
  }
  
  onGetTasksFail(data) {
    this.tasks = data;
  }
  
  onStartGetTabs() {
    this.status = 'downloading';
    this.viewSearches = [];
  }

  onGetTabsSuccess(data) {
    this.responses += data.length;
    this.status = 'decrypting';
  }

  onGetTabsFail(errorMessage) {
    toastr.error(`Error Getting Searches:\n${errorMessage}`);
  }
  
  onGetCountsSuccess(data) {
    this.todo = data.todo;
    this.total = data.total;
  }

  onGetCountsFail(errorMessage) {
    toastr.error(`Error Getting Conuts:\n${errorMessage}`);
  }

  onDecryptedSearchSuccess(data) {
    if (findWhere(this.viewSearches, {_id: data.decrypted._id})) {
        return;
    } else {
        SearchReportActions.decodeSearch(data);
    }
  }
  
  onDecryptedSearchFail(data) {
    if (contains(data.fields, 'urlHash')) {
      SearchReportActions.decodeSearch(data);
    } else {
      this.viewSearches.push(data.decrypted);
    }
    toastr.error(`Error some decrypting data:\n${data.err.message}`);
    if (this.viewSearches.length == this.responses) {
      this.status = 'displaying'
    }
  }
  
  onDecodedSuccess(data) {
    data.item.title = (data.history.title)? data.history.title : data.item.urlHash;
    if (this.taskMap[data.item.urlHash]) {
      return SearchReportActions.assignSelected(data.token, data.port, [data.item], this.taskMap[data.item.urlHash])
    } else {
      this.viewSearches.push(data.item);
      if (this.viewSearches.length == this.responses) {
        this.status = 'displaying'
      }
    }
  }
  
  onDecodedFail(data) {
    data.item.title = data.item.urlHash;
    this.viewSearches.push(data.item);
    if (this.viewSearches.length == this.responses) {
      this.status = 'displaying'
    }
  }
  
  onNextPage() {
    this.page += 1;
  }
  
  onPreviousPage() {
    this.page -= 1; 
  }

  onSelectTab(payload) {
    let checked = payload.event.target.checked
    if (checked) {
      this.selectedSearches.push(findWhere(this.viewSearches, {_id: payload.id}));
    } else {
      this.selectedSearches.splice(findIndex(this.selectedSearches, {_id: payload.id}), 1);
    }
  }

}

export default alt.createStore(SearchReportStore);
