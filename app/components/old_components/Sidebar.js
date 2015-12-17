import React from 'react';
import {Link} from 'react-router';
import SidebarStore from '../stores/SidebarStore';
import SidebarActions from '../actions/SidebarActions';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = SidebarStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    SidebarStore.listen(this.onChange);
    SidebarActions.getCharacterCount();

  }

  componentWillUnmount() {
    SidebarStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    return (
      <ul class="nav nav-sidebar">
        <li><Link to='/stats'>Overview</Link></li>
        <li><Link to='/report'>Report Search</Link></li>
        <li><Link to='/sync'>Sync</Link></li>
        <li><Link to='/analytics'>Analytics</Link></li>
        <li><a href="#">Export</a></li>
      </ul>
    );
  }
}
            
Sidebar.contextTypes = {
  router: React.PropTypes.func.isRequired
};

export default Sidebar;
