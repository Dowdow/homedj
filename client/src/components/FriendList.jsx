import React, { Component } from 'react';
import { connect } from 'react-redux';
import Friend from './Friend';
import { getFriends } from '../actions/friends';
import '../css/FriendList.css';

class FriendList extends Component {
  static renderFriend(friend) {
    return <Friend key={friend._id} {...friend} add={false} remove={false} />;
  }

  constructor(props) {
    super(props);
    this.refreshFriends = this.refreshFriends.bind(this);
  }

  componentWillMount() {
    this.props.getFriends();
  }

  refreshFriends() {
    this.props.getFriends();
  }

  renderFriendGroup(friend) {
    return <Friend key={friend._id} {...friend} removeUserFromGroup={this.props.removeUserFromGroup} />;
  }

  renderFriendNotGroup(friend) {
    return <Friend key={friend._id} {...friend} addUserToGroup={this.props.addUserToGroup} />;
  }

  render() {
    if (this.props.currentGroup === null) {
      return (
        <div className="friendList box">
          <h4>Friends</h4>
          {this.props.friends.map(friend => FriendList.renderFriend(friend))}
          <div className="button">
            <button onClick={this.refreshFriends}>Refresh friends</button>
          </div>
        </div>
      );
    }

    return (
      <div className="friendList box">
        <h4>Friends in group</h4>
        {this.props.friends.map(friend => (this.props.currentGroup.users.indexOf(friend._id) !== -1 ? this.renderFriendGroup(friend) : ''))}
        <h4>Friends</h4>
        {this.props.friends.map(friend => (this.props.currentGroup.users.indexOf(friend._id) === -1 ? this.renderFriendNotGroup(friend) : ''))}
        <div className="button">
          <button onClick={this.refreshFriends}>Refresh friends</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    friends: state.friends,
  };
}

export default connect(mapStateToProps, { getFriends })(FriendList);
