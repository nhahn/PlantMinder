import React from 'react';
import {Link} from 'react-router';

class PlantList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //FooterStore.listen(this.onChange);
  }

  componentWillUnmount() {
    //FooterStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    var filler = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9InllcyI/PjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgdmlld0JveD0iMCAwIDE0MCAxNDAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjwhLS0KU291cmNlIFVSTDogaG9sZGVyLmpzLzE0MHgxNDAKQ3JlYXRlZCB3aXRoIEhvbGRlci5qcyAyLjYuMC4KTGVhcm4gbW9yZSBhdCBodHRwOi8vaG9sZGVyanMuY29tCihjKSAyMDEyLTIwMTUgSXZhbiBNYWxvcGluc2t5IC0gaHR0cDovL2ltc2t5LmNvCi0tPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PCFbQ0RBVEFbI2hvbGRlcl8xNTFjMTY2NzVkMSB0ZXh0IHsgZmlsbDojQUFBQUFBO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1mYW1pbHk6QXJpYWwsIEhlbHZldGljYSwgT3BlbiBTYW5zLCBzYW5zLXNlcmlmLCBtb25vc3BhY2U7Zm9udC1zaXplOjEwcHQgfSBdXT48L3N0eWxlPjwvZGVmcz48ZyBpZD0iaG9sZGVyXzE1MWMxNjY3NWQxIj48cmVjdCB3aWR0aD0iMTQwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI0VFRUVFRSIvPjxnPjx0ZXh0IHg9IjQ0LjA1NDY4NzUiIHk9Ijc0LjUiPjE0MHgxNDA8L3RleHQ+PC9nPjwvZz48L3N2Zz4="; 
    
    var plants = this.props.plants.map((plant, index) => {
      return (
        <Link to="/plant/:id" key={plant._id} params={{id: plant.device.uuid}} className="list-group-item">
          <div className="row">
            <div className="col-xs-3">
              <img src={(plant.image)? plant.image : filler} className="img-thumbnail img-responsive"/>
            </div>
            <div className="col-xs-9">
              <h4 className="list-group-item-heading">{plant.name}</h4>
              <p className="list-group-item-text">Type: {plant.type}</p>
              <p className="list-group-item-text">Device: {plant.device.uuid}</p>
            </div>
          </div>
        </Link>  
      );
    });
    
    return (
      <div classNam="list-group fadeInUp animated">
        {plants}
      </div>
    );
  }
}

export default PlantList;
