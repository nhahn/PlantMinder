import alt from '../alt';
import Config from '../config';

class SearchReportActions {
  constructor() {
    this.generateActions(
      'getTabsSuccess',
      'getTabsFail',
      'getTasksSuccess',
      'getTasksFail',
      'decryptedSearchSuccess',
      'decryptedSearchFail',
      'startGetTabs',
      'selectTab',
      'decodedSuccess',
      'decodedFail',
      'nextPage',
      'previousPage',
      'addTask',
      'cancelAddTask',
      'updateTaskName',
      'updateTaskType',
      'newTaskSuccess',
      'newTaskFail',
      'updateName',
      'updateType',
      'assignSuccess',
      'assignFail',
      'getCountsSuccess',
      'getCountsFail'
    );  
  }

  getTabs(token, port=null, limit=30, skip=0) {
    $.ajax({
      type: 'GET',
      url: '/api/model/tabs/root/empty',
      data: { token: token, limit: limit, skip: skip }
    })  
      .done((data) => {
        data.forEach( search => {
          search.type = "search";
          port.postMessage({payload: search, fields: ['query', 'urlHash', 'domainHash']}) 
        }); 
        this.actions.getTabsSuccess(data);
      })  
      .fail((jqXhr) => {
        this.actions.getTabsFail(jqXhr.responseJSON.message);
      }); 
  }
  
  getTasks(token) {
    $.ajax({
      type: 'GET',
      url: '/api/tasks',
      data: { token: token }
    })  
      .done((data) => {
        this.actions.getTasksSuccess(data);
      })  
      .fail((jqXhr) => {
        this.actions.getTasksFail(jqXhr.responseJSON.message);
      }); 
  }
  
  getCounts(token) {
    $.ajax({
      type: 'GET',
      url: '/api/model/tabs/root/count',
      data: { token: token }
    })  
      .done((data) => {
        this.actions.getCountsSuccess(data);
      })  
      .fail((jqXhr) => {
        this.actions.getCountsFail(jqXhr.responseJSON.message);
      }); 
  }
  
  newTask(token, name, type) {
    $.ajax({
      type: 'POST',
      url: '/api/tasks',
      data: { token: token, name: name, type: type}
    })  
      .done((data) => {
        this.actions.newTaskSuccess(data);
      })  
      .fail((jqXhr) => {
        this.actions.newTaskFail(jqXhr.responseJSON.message);
      }); 
  }
  
  assignSelected(token, port, selected, task) {
    let submit = selected.map((item, idx) => {
      return {tab: item._id, name: task}
    });
    $.ajax({
      type: 'POST',
      url: '/api/tasks/associate',
      contentType: "application/json",
      data: JSON.stringify({ token: token, tabs: submit})
    })  
      .done((data) => {
        this.actions.assignSuccess({token: token, port: port, selected: selected, task: task});
      })  
      .fail((jqXhr) => {
        this.actions.assignFail(jqXhr.responseJSON.message);
      }); 
  }
  
  replaceNewTab(token, port, data) {
    let source = (data.source)? data.source : data.tabSource;
    $.ajax({
      type: 'GET',
      url: '/api/model/tabs/replace',
      contentType: "application/json",
      data: JSON.stringify({ token: token, snapshotId: source.snapshotId, tabId: source.tabId})
    })  
      .done((replacement) => {
        data.urlHash = replacement.urlHash;
        data.query = replacement.query;
        data.domainHash = replacement.domainHash;
        data.type = "search";
        port.postMessage({payload: data, fields: ['query', 'urlHash', 'domainHash']}) 
      })  
      .fail((jqXhr) => {
        this.actions.getTabsFail(jqXhr.responseJSON.message);
      });
  }
  
  decodeSearch(msg) {
    //TODO
    let data = msg.decrypted;
    if (data.urlHash == "chrome://newtab/") {
      if (!data.target && !data.tabTarget) {
        return this.actions.assignSelected(msg.token, msg.port, [data], "newTab");
      } else {
        return this.actions.replaceNewTab(msg.token, port, data);
      }
    }
    let decoded = data.urlHash.match(/www\.google\.com\/.*url=(.*?)($|\&)/);
    if (decoded && decoded != "null" && decoded instanceof Array && decoded[1]) {
      data.urlHash = decodeURIComponent(decoded[1]);
    }
    let search = data.urlHash.match(/www\.google\.com\/.*q=(.*?)($|\&)/);
    if (search && search != "null" && search instanceof Array && search[1]) {
      setTimeout(() => {
        this.actions.decodedSuccess({history: {title: "Google search: " + search[1]}, item: data});
      }, 100);
    } else {
      chrome.runtime.sendMessage(Config.extensionKey, {cmd: 'history', url: data.urlHash}, (response) => {
        if (response.cmd == 'found' && response.item) {
          this.actions.decodedSuccess({history: response.item, item: data, token: msg.token, port: msg.port});
        } else {
          this.actions.decodedFail({item: data, token: msg.token, port: msg.port});
        }
      });
    }
  }
}

export default alt.createActions(SearchReportActions);
