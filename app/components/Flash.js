import React from 'react';
import FlashStore from '../stores/FlashStore';
import FlashActions from '../actions/FlashActions';

class Flash extends React.Component {

  constructor(props) {
    super(props);
    this.state = FlashStore.getState();
    this.onChange = this.onChange.bind(this);
  }
  
  componentDidMount() {
    FlashStore.listen(this.onChange);
    FlashActions.setNotifications(this.props.messages);
  }

  componentWillUnmount() {
    FlashStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }
  
  handleClick(index) {
    FlashActions.clearNotification(index); 
  }

  render() {
    let _flash_class =  function(level) {
      var _result = 'alert alert-error';
      if (level === 'notice') {
        _result = 'alert alert-info';
      } else if (level === 'success') {
        _result = 'alert alert-success';
      } else if (level === 'error') {
        _result = 'alert alert-error';
      } else if (level === 'alert') {
        _result = 'alert alert-error';
      }
      return _result;
    }
    
    return (
      <div className='flash_messages_component'>
        {this.state.messages.map(function(message, index) {
          _level = message[0];
          _text  = message[1];
          return (
            <div key={index} className={this._flash_class(_level)}>
              <button type="button" className="close" aria-label="Close" onClick={this.handleClick.bind(this, index)}><span aria-hidden="true">&times;</span></button>
              {_text}
            </div>
          );
        }.bind(this))}
      </div>
    )
  }

}

export default Home;
