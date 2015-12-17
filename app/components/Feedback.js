import React from 'react';
import {Link} from 'react-router';

class Feedback extends React.Component {
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
    return (
      <div className='container'>
      </div>
    );
  }
}

export default Feedback;