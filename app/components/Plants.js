import React from 'react';
import {Link} from 'react-router';
import PlantsStore from '../stores/PlantsStore';
import PlantsActions from '../actions/PlantsActions';
import createActiveRouteComponent from 'react-router-active-component';
import {RouteHandler} from 'react-router';


class Plants extends React.Component {
  constructor(props) {
    super(props);
    this.state = PlantsStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    PlantsStore.listen(this.onChange);
    $(function() {PlantsActions.fetchPlants();});
  }

  componentWillUnmount() {
    PlantsStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    let NavLink = createActiveRouteComponent('li');
    var locations = this.state.locations.map((location, index) => {
      return (
      <li role="presentation" key={location._id} className={(this.state.currentLocation == location)? "active" : ""}>
        <a onClick={PlantsActions.setCurrentLocation.bind(this,location)}>{location.name}</a>
      </li>
      )
    });
    
    return (
      <div className='container'>
        <div className="row">
          <div className="col-sm-2">
            <h3>Locations</h3>
            <ul className="nav nav-pills nav-stacked">
              {locations}
            </ul>
            <br/>
          </div>
          <div className="col-sm-10">
            <h3>Your Plants</h3>
            {(() => {
              if (this.state.locations.length > 0)
                return <RouteHandler location={this.state.currentLocation} plants={this.state.currentLocation.plants}/>
              else
                return(
                  <div className='thumbnail fadeInUp animated row'>
                    <div className="col-xs-12">
                      <h4>Loading Plants</h4>
                      <div className="progress">
                        <div className="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: "100%"}}>
                          <span className="sr-only">In Progress</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
            })()}
          </div>
        </div>
      </div>
    );
  }
}

export default Plants;