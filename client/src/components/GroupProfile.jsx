import React, { Component } from 'react';
import '../css/GroupProfile.css';

class GroupProfile extends Component {
  constructor(props) {
    super(props);
    this.handleReturnToGroups = this.handleReturnToGroups.bind(this);
    this.handleDeleteGroup = this.handleDeleteGroup.bind(this);
  }

  componentWillMount() {
    this.props.socket.on('deleteGroup', () => {
      this.props.returnToGroups();
    });
  }

  handleReturnToGroups() {
    this.props.returnToGroups();
  }

  handleDeleteGroup() {
    this.props.socket.emit('deleteGroup', this.props.currentGroup);
  }

  render() {
    return (
      <div className="groupProfile box">
        <h4>Group profile</h4>
        <div className="button">
          <button onClick={this.handleReturnToGroups}>Return to groups</button>
        </div>
        <div className="button">
          <button onClick={this.handleDeleteGroup}>Delete group</button>
        </div>
      </div>
    );
  }
}

export default GroupProfile;
