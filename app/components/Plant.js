import React from 'react';
import PlantStore from '../stores/PlantStore';
import PlantActions from '../actions/PlantActions';
import PlantsActions from '../actions/PlantsActions';
import InlineEdit from './InlineEdit';
import {findWhere, find} from 'underscore';
import {ButtonGroup, Button} from 'react-bootstrap';
import Chart from './Chart';
import Cropper from './Cropper';

class Plant extends React.Component {
  constructor(props) {
    super(props);
    this.plant = find(props.plants, (plant) => { return plant.device.uuid == this.props.params.id});
    this.state = PlantStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    PlantStore.listen(this.onChange);
    PlantActions.fetchDevice(this.props.params.id);
  }
  
  componentWillReceiveProps(nextProps) {
    this.plant = findWhere(nextProps.plants, (plant) => { return plant.device.uuid == this.props.params.id});
  }

  componentWillUnmount() {
    PlantStore.unlisten(this.onChange);
  }
  
  onChange(state) {
    this.setState(state);
  }

  render() {
    
    return (
      <div>
      <div className="row fadeInUp animated">
        <div className="col-md-4 col-sm-5" >
          <Cropper uploadImage={PlantsActions.uploadImage.bind(this, this.props.location, this.plant)} filler='/img/filler.jpg' image={this.plant.image}/>
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
          <hr/>
          <div className="row">
            
          </div>
        </div>
      </div>
      <div className="row" style={{paddingBottom: 20, paddingTop: 20}}>
        <div className="col-xs-12">
          <ButtonGroup>
            <Button active={this.state.chartLevel == 'hourly'} bsSize="sm" onClick={PlantActions.chartRange.bind(this, 'hourly')}>Hourly</Button>
            <Button active={this.state.chartLevel == 'weekly'} bsSize="sm" onClick={PlantActions.chartRange.bind(this, 'weekly')}>Weekly</Button>
            <Button active={this.state.chartLevel == 'monthly'} bsSize="sm" onClick={PlantActions.chartRange.bind(this, 'monthly')}>Monthly</Button>
          </ButtonGroup>
        </div>
      </div>
      <Chart aspectRatio="ct-double-octave" className="ct-lux" labels={this.state.labels} data={this.state.luxData} img="/img/sun.svg" name="Sunlight"/>
      <Chart aspectRatio="ct-double-octave" className="ct-soil" labels={this.state.labels} data={this.state.soilData} img="/img/watering_can.svg" name="Soil Moisture"/>
      <Chart aspectRatio="ct-double-octave" className="ct-temp" labels={this.state.labels} data={this.state.tempData} img="/img/thermometer.svg" name="Temperature">
        <ButtonGroup className="pull-right">
            <Button active={this.state.tempScale == 'F'} bsSize="sm" onClick={PlantActions.tempScale.bind(this, 'F')}>F</Button>
            <Button active={this.state.tempScale == 'C'} bsSize="sm" onClick={PlantActions.tempScale.bind(this, 'C')}>C</Button>
          </ButtonGroup>
      </Chart>
      <Chart aspectRatio="ct-double-octave" className="ct-humid" labels={this.state.labels} data={this.state.humidData} img="/img/humidity.svg" name="Humidity"/>
      </div>
    );
  }
}

export default Plant;