import React, { Component } from 'react';
import { connect } from 'react-redux';
import GroupList from './GroupList';
import GroupProfile from './GroupProfile';
import Playlist from './Playlist';
import FriendList from './FriendList';
import { setGroup, addUserToGroup, removeUserFromGroup } from '../actions/group';
import '../css/Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.handleSelectGroup = this.handleSelectGroup.bind(this);
    this.handleLeaveGroup = this.handleLeaveGroup.bind(this);
    this.addUserToGroup = this.addUserToGroup.bind(this);
    this.removeUserFromGroup = this.removeUserFromGroup.bind(this);
  }

  handleSelectGroup(group) {
    this.props.setGroup(group);
  }

  handleLeaveGroup() {
    this.props.setGroup(null);
  }

  addUserToGroup(friend) {
    this.props.addUserToGroup(this.props.currentGroup._id, friend);
  }

  removeUserFromGroup(friend) {
    this.props.removeUserFromGroup(this.props.currentGroup._id, friend);
  }

  render() {
    return (
      <div className="grid">
        <section>
          {
            this.props.currentGroup === null ?
              <GroupList user={this.props.user} selectGroup={this.handleSelectGroup} /> :
              <GroupProfile
                currentGroup={this.props.currentGroup}
                returnToGroups={this.handleLeaveGroup}
              />
          }
        </section>
        <section>
          <Playlist />
        </section>
        <section>
          <FriendList
            currentGroup={this.props.currentGroup}
            addUserToGroup={this.addUserToGroup}
            removeUserFromGroup={this.removeUserFromGroup}
          />
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentGroup: state.group,
  };
}

export default connect(mapStateToProps, { setGroup, addUserToGroup, removeUserFromGroup })(Home);
