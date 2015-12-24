import React from 'react';
import PlantStore from '../stores/PlantStore';
import PlantActions from '../actions/PlantActions';
import PlantsActions from '../actions/PlantsActions';
import InlineEdit from './InlineEdit';
import {findWhere, find} from 'underscore';

class Plant extends React.Component {
  constructor(props) {
    super(props);
    this.plant = find(props.plants, (plant) => { return plant.device.uuid == this.props.params.id});
    this.state = PlantStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    PlantStore.listen(this.onChange);
    var loaded = true;
    this.cropit = $('#image-cropper').cropit({ 
      imageState: { src: (this.plant.image != "")? this.plant.image : '/img/filler.jpg' },
      imageBackground: true,
      onImageLoaded: () => {
        if (!loaded)
          PlantActions.editingImage();
        else
          loaded = false;
      }
    });
    PlantActions.fetchDevice(this.props.params.id);
    nv.addGraph(() => {
      var chart = nv.models.lineWithFocusChart();

      chart.xAxis
          .tickFormat(d3.format(',f'));

      chart.yAxis
          .tickFormat(d3.format(',.2f'));

      chart.y2Axis
          .tickFormat(d3.format(',.2f'));

      d3.select('#chart1 svg')
          .datum(this.testData())
          .transition().duration(500)
          .call(chart);

      nv.utils.windowResize(chart.update);

      return chart;
    });
    /**************************************
     * Simple test data generator
     */
  }
  
  testData() {
    return this.stream_layers(3,128,.1).map(function(data, i) {
      return { 
        key: 'Stream' + i,
        values: data
      };
    });
  }
  
  stream_layers(n, m, o) {
    function stream_index(d, i) {
      return {x: i, y: Math.max(0, d)};
    }
    
    if (arguments.length < 3) o = 0;
    function bump(a) {
      var x = 1 / (.1 + Math.random()),
          y = 2 * Math.random() - .5,
          z = 10 / (.1 + Math.random());
      for (var i = 0; i < m; i++) {
        var w = (i / m - y) * z;
        a[i] += x * Math.exp(-w * w);
      }
    }
    return d3.range(n).map(function() {
        var a = [], i;
        for (i = 0; i < m; i++) a[i] = o + o * Math.random();
        for (i = 0; i < 5; i++) bump(a);
        return a.map(stream_index);
    });
  }
  
  componentWillReceiveProps(nextProps) {
    this.plant = findWhere(nextProps.plants, (plant) => { return plant.device.uuid == this.props.params.id});
  }

  componentWillUnmount() {
    PlantStore.unlisten(this.onChange);
  }

  saveImage() { //Convert to bas64, resize, and then upload
    var image = $(this.cropit).cropit('export', {
      type: 'image/jpeg',
      quality: .9,
      originalSize: false
    });
    PlantsActions.uploadImage(this.props.location, this.plant, image);
  }
  
  onChange(state) {
    this.setState(state);
  }

  render() {
    
    return (
      <div>
      <div className="row fadeInUp animated">
        <div className="col-md-4 col-sm-5" >
          <div id="image-cropper" className="img-responsive">
            <div className="cropit-image-preview-container">
              <div className="cropit-image-preview" style={{width: 200, height: 200}}></div>
            </div>
            <input type="range" style={{visibility: (this.state.editingImage)? 'visible': 'hidden'}} id="imageZoom" className="cropit-image-zoom-input" />
            <input type="file" style={{visibility: 'hidden'}} className="cropit-image-input" />
          </div>
          <div className="row" syle={{paddingTop: 10}}>
            <div className="col-xs-6">
              <button className="btn btn-default" onClick={() => $('.cropit-image-input').click()}>Change Picture</button>&nbsp;
            </div>
            <div className="col-xs-6">
              <button className="btn btn-primary" onClick={this.saveImage.bind(this)}>Save Picture</button>
            </div>
          </div>
        </div>
        <div className="col-sm-7">
          <div className="row">
            <div className="col-xs-4">
              Name:
            </div>
            <div className="col-xs-8">
              <InlineEdit text={this.plant.name} className="pull-left" placeholder="Set a Name" change={PlantsActions.updateName.bind(this, this.props.location, this.plant)} errorText="Please enter a valid name"/>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-4">
              Type:
            </div>
            <div className="col-xs-8">
              <InlineEdit text={this.plant.type} className="pull-left" placeholder="Set a Type" change={PlantsActions.updateType.bind(this, this.props.location, this.plant)} errorText="Please enter a valid type"/>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-4">
              MAC Address: 
            </div>
            <div className="col-xs-8">
              {this.state.device.mac}
            </div>
          </div>
          <div className="row">
            <div className="col-xs-4">
              Firmware:
            </div>
            <div className="col-xs-8">
              {this.state.device.firmware}
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-12" id="chart1">
          <svg style={{height: 500}}></svg>
        </div>
      </div>
      </div>
    );
  }
}

export default Plant;