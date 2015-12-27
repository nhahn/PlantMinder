import alt from '../alt';
import PlantActions from '../actions/PlantActions';
import {assign, range} from 'underscore';

class PlantStore {
  constructor() {
    this.bindActions(PlantActions);
    this.device = {};
    this.chartLevel = 'hourly';
    this.tempScale = 'F'
    this.labels = [];
    this.tempData = [];
    this.soilData = [];
    this.humidData = [];
    this.luxData = [];
  }
  
  onDeviceFetched(payload) {
    this.device = payload.device;
    PlantActions.fetchRecords(this.device._id, this.chartLevel);
  }
  
  onRecordsRetreived(payload) {
    this.tempData = [[]];
    this.soilData = [[]];
    this.humidData = [[]];
    this.luxData = [[]];
    this.labels = [];
    
    if (this.chartLevel == 'hourly') {
      payload.forEach((record) => {
        if (record._id.interval == 0)
          this.labels.push(record._id.hour);
        else
          this.labels.push(null);
      });
    } else if (this.chartLevel == 'weekly') {
      var trans = {1: "Sunday", 2: "Monday", 3: "Tuesday", 4: "Wednesday", 5: "Thursday", 6: "Firday", 7: "Saturday"};
      payload.forEach((record) => {
        if (record._id.interval == 0)
          this.labels.push(trans[record._id.dayOfWeek]);
        else
          this.labels.push(null);
      });
    } else if (this.chartLevel == 'monthly') {
      payload.forEach((record) => {
        this.labels.push(record._id.dayOfMonth);
      });
    }
    
    payload.forEach((record) => {
      this.tempData[0].push((this.tempScale == 'C')? record.temp : record.temp * 1.8 + 32);
      this.soilData[0].push(record.soil);
      this.luxData[0].push(record.lux);
      this.humidData[0].push(record.humid);
    });
  }
  
  onChartRange(range) {
    this.chartLevel = range[0];
    setTimeout(() => PlantActions.fetchRecords(this.device._id, this.chartLevel), 100);
  }
  
  onTempScale(scale) {
    this.tempDataTemp = [[]];
    if (this.tempScale != scale[0]) {
      for(var i = 0; i < this.tempData[0].length; i++) {
        if (scale[0] == 'C')
          this.tempDataTemp[0].push((this.tempData[0][i] - 32) / 1.8);
        else
          this.tempDataTemp[0].push(this.tempData[0][i] * 1.8 + 32);
      }
    }
    this.tempData = this.tempDataTemp;
    this.tempScale = scale[0];
  }
  
  onRecordsError(payload) {
    
  }
}

export default alt.createStore(PlantStore);
