import React from 'react';
import {Link} from 'react-router';
import HomeStore from '../stores/HomeStore'
import HomeActions from '../actions/HomeActions';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = HomeStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    HomeStore.listen(this.onChange);
  }

  componentWillUnmount() {
    HomeStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <div className='container'>
        <div className='row fadeInUp animated'>
          <div className='col-sm-10 col-sm-offset-1 thumbnail'>
            <img src='/img/home_plant.jpg'/>  
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-3 col-sm-offset-2'>
            <h3>Peace of Mind</h3>
          </div>
          <div className='col-sm-5'>
            <p>Plant Minder helps you take care of and monitor your indoor plants. Your can install the application on your iPhone or Android advice to recieve alerts about care information. </p>
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-3 col-sm-offset-2'>
            <h3>Optimal Care</h3>
          </div>
          <div className='col-sm-5'>
            <p>Plant Minder provides you history about sunlight, humidity, temperature, and soil moisture</p>
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-3 col-sm-offset-2'>
            <h3>Set it and Forget It</h3>
          </div>
          <div className='col-sm-5'>
            <p>Plant Minder is powered by two AA batteries, can last for months!</p>
          </div>
        </div>
      </div> 
    )
  }
}

export default Home;
