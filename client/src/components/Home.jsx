import React, { Component } from 'react';
import GroupList from './GroupList';
import GroupProfile from './GroupProfile';
import Playlist from './Playlist';
import FriendList from './FriendList';
import '../css/Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGroup: null,
    };
    this.handleSelectGroup = this.handleSelectGroup.bind(this);
    this.handleLeaveGroup = this.handleLeaveGroup.bind(this);
    this.addUserToGroup = this.addUserToGroup.bind(this);
    this.removeUserFromGroup = this.removeUserFromGroup.bind(this);
  }

  componentWillMount() {
    this.props.socket.on('addUserToGroup', (user) => {
      this.setState(prevState => ({
        currentGroup: {
          _id: prevState.currentGroup._id,
          name: prevState.currentGroup.name,
          users: [...prevState.currentGroup.users, user],
        },
      }));
    });
    this.props.socket.on('removeUserFromGroup', (user) => {
      this.setState(prevState => ({
        currentGroup: {
          _id: prevState.currentGroup._id,
          name: prevState.currentGroup.name,
          users: [...prevState.currentGroup.users].filter(u => u !== user),
        },
      }));
    });
  }

  handleSelectGroup(group) {
    this.setState({
      currentGroup: group,
    });
  }

  handleLeaveGroup() {
    this.setState({
      currentGroup: null,
    });
  }

  addUserToGroup(friend) {
    this.props.socket.emit('addUserToGroup', { friend, group: this.state.currentGroup._id });
  }

  removeUserFromGroup(friend) {
    this.props.socket.emit('removeUserFromGroup', { friend, group: this.state.currentGroup._id });
  }

  render() {
    return (
      <div className="grid">
        <section>
          {
            this.state.currentGroup === null ?
              <GroupList socket={this.props.socket} user={this.props.user} selectGroup={this.handleSelectGroup} /> :
              <GroupProfile
                socket={this.props.socket}
                currentGroup={this.state.currentGroup}
                returnToGroups={this.handleLeaveGroup}
              />
          }
        </section>
        <section>
          <Playlist />
        </section>
        <section>
          <FriendList
            socket={this.props.socket}
            currentGroup={this.state.currentGroup}
            addUserToGroup={this.addUserToGroup}
            removeUserFromGroup={this.removeUserFromGroup}
          />
        </section>
      </div>
    );
  }
}

export default Home;
