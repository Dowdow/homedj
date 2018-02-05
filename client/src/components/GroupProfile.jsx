import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteGroup, waitDeleteGroup } from '../actions/groups';
import '../css/GroupProfile.css';

class GroupProfile extends Component {
  constructor(props) {
    super(props);
    this.handleReturnToGroups = this.handleReturnToGroups.bind(this);
    this.handleDeleteGroup = this.handleDeleteGroup.bind(this);
  }

  componentWillMount() {
    this.props.waitDeleteGroup();
  }

  handleReturnToGroups() {
    this.props.returnToGroups();
  }

  handleDeleteGroup() {
    this.props.deleteGroup(this.props.currentGroup);
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

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, { deleteGroup, waitDeleteGroup })(GroupProfile);
