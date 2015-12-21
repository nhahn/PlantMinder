import React from 'react';
import PlantStore from '../stores/PlantStore';
import PlantActions from '../actions/PlantActions';
import PlantsActions from '../actions/PlantsActions';
import {findWhere, find} from 'underscore';

import Dropzone from 'react-dropzone';

class Plant extends React.Component {
  constructor(props) {
    super(props);
    this.plant = find(props.plants, (plant) => { return plant.device.uuid == this.props.params.id});
    this.filler = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgdmlld0JveD0iMCAwIDE0MCAxNDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzE0MHgxNDAKQ3JlYXRlZCB3aXRoIEhvbGRlci5qcyAyLjYuMC4KTGVhcm4gbW9yZSBhdCBodHRwOi8vaG9sZGVyanMuY29tCihjKSAyMDEyLTIwMTUgSXZhbiBNYWxvcGluc2t5IC0gaHR0cDovL2ltc2t5LmNvCi0tPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PCFbQ0RBVEFbI2hvbGRlcl8xNTFjMTY2NzVkMSB0ZXh0IHsgZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQgfSBdXT48L3N0eWxlPjwvZGVmcz48ZyBpZD0iaG9sZGVyXzE1MWMxNjY3NWQxIj48cmVjdCB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI0VFRUVFRSIvPjxnPjx0ZXh0IHg9IjQ0LjA1NDY4NzUiIHk9Ijc0LjUiPjE0MHgxNDA8L3RleHQ+PC9nPjwvZz48L3N2Zz4=";
    this.state = PlantStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    PlantStore.listen(this.onChange);
  }
  
  componentWillReceiveProps(nextProps) {
    this.plant = findWhere(nextProps.plants, (plant) => { return plant.device.uuid == this.props.params.id});
  }

  componentWillUnmount() {
    PlantStore.unlisten(this.onChange);
  }

  onDrop(files) { //Convert to bas64, resize, and then upload
    var self = this;
    var width = 200;
    var height = 200;
    files[0].convertToBase64(function(base64) {
      var canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      var context = canvas.getContext("2d");
      $("<img/>").attr("src", base64).load(function() {
        context.scale(width/this.width,  height/this.height);
        context.drawImage(this, 0, 0); 
        PlantsActions.uploadImage(self.props.location, self.plant, canvas.toDataURL());               
      });
    });
  }
  
  onChange(state) {
    this.setState(state);
  }

  render() {
    
    return (
      <div className="row">
        <div className="col-sm-3">
          <Dropzone className="imageDropZone" activeClassName="imageDropZoneActive" onDrop={this.onDrop.bind(this)} accept="image/*" multiple={false}>
            <img draggable="false" src={(this.plant.image)? this.plant.image : this.filler} className="img-thumbnail img-responsive"/>
          </Dropzone>
        </div>
        <div className="col-sm-7">
          <p>Name: {this.plant.name}</p>
          <p>Type: {this.plant.type}</p>
        </div>
      </div>
    );
  }
}

export default Plant;