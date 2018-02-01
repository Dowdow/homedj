import React, { Component } from 'react';
import Friend from './Friend';
import '../css/FriendList.css';

class FriendList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      'friends': []
    };
  }

  componentWillMount() {
    this.props.socket.on('getFriends', friends => {
      this.setState({
        'friends': friends
      })
    });
    this.props.socket.emit('getFriends');
  }

  refreshFriends = () => {
    this.props.socket.emit('getFriends');
  };

  static renderFriend(friend) {
    return <Friend key={friend._id} {...friend} add={false} remove={false} />;
  }

  renderFriendGroup(friend) {
    return <Friend key={friend._id} {...friend} add={false} remove={true} removeUserFromGroup={this.props.removeUserFromGroup} />;
  }

  renderFriendNotGroup(friend) {
    return <Friend key={friend._id} {...friend} add={true} remove={false} addUserToGroup={this.props.addUserToGroup} />;
  }

  render() {
    if (this.props.currentGroup === null) {
      return (
        <div className="friendList box">
          <h4>Friends</h4>
          {this.state.friends.map(friend => FriendList.renderFriend(friend))}
          <div className="button">
            <button onClick={this.refreshFriends}>Refresh friends</button>
          </div>
        </div>
      )
    }
    else {
      return (
        <div className="friendList box">
          <h4>Friends in group</h4>
          {this.state.friends.map(friend => {
            return this.props.currentGroup.users.indexOf(friend._id) !== -1 ? this.renderFriendGroup(friend) : ''
          })}
          <h4>Friends</h4>
          {this.state.friends.map(friend => {
            return this.props.currentGroup.users.indexOf(friend._id) === -1 ? this.renderFriendNotGroup(friend) : ''
          })}
          <div className="button">
            <button onClick={this.refreshFriends}>Refresh friends</button>
          </div>
        </div>
      )
    }
  };
}

export default FriendList