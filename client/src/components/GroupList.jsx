import React, { Component } from 'react';
import { connect } from 'react-redux';
import Group from './Group';
import { createGroup, getGroups, waitCreateGroup, waitGroups } from '../actions/groups';
import '../css/GroupList.css';

class GroupList extends Component {
  constructor(props) {
    super(props);
    this.handleGetGroups = this.handleGetGroups.bind(this);
    this.handleCreateGroup = this.handleCreateGroup.bind(this);
  }

  componentWillMount() {
    this.props.waitGroups();
    this.props.waitCreateGroup();
    this.props.getGroups();
  }

  handleGetGroups() {
    this.props.getGroups();
  }

  handleCreateGroup() {
    this.props.createGroup();
  }

  render() {
    return (
      <div className="groupList box">
        <h4>Groups</h4>
        {this.props.groups.map(group => <Group key={group._id} selectGroup={this.props.selectGroup} {...group} />)}
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

function mapStateToProps(state) {
  return {
    groups: state.groups,
  };
}

export default connect(mapStateToProps, {
  createGroup, getGroups, waitCreateGroup, waitGroups,
})(GroupList);
