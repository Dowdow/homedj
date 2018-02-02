import React, { Component } from 'react';
import Group from './Group';
import '../css/GroupList.css';

class GroupList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
    };
    this.handleGetGroups = this.handleGetGroups.bind(this);
    this.handleCreateGroup = this.handleCreateGroup.bind(this);
  }

  componentWillMount() {
    this.props.socket.on('getGroups', (groups) => {
      this.setState({
        groups,
      });
    });
    this.props.socket.on('createGroup', (group) => {
      this.setState(prevState => ({
        groups: [...prevState.groups, group],
      }));
    });
    this.props.socket.emit('getGroups');
  }

  handleGetGroups() {
    this.props.socket.emit('getGroups');
  }

  handleCreateGroup() {
    this.props.socket.emit('createGroup', { name: '' });
  }

  render() {
    return (
      <div className="groupList box">
        <h4>Groups</h4>
        {this.state.groups.map(group => <Group key={group._id} selectGroup={this.props.selectGroup} {...group} />)}
        <div className="button">
          <button onClick={this.handleGetGroups}>Refresh groups</button>
        </div>
        <div className="button">
          <button onClick={this.handleCreateGroup}>Create a group</button>
        </div>
      </div>
    );
  }
}

export default GroupList;
