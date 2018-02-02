import React, { Component } from 'react';

class Friend extends Component {
  constructor(props) {
    super(props);
    this.handleAddUserToGroup = this.handleAddUserToGroup.bind(this);
    this.handleRemoveUserFromGroup = this.handleRemoveUserFromGroup.bind(this);
  }

  handleAddUserToGroup() {
    this.props.addUserToGroup(this.props._id);
  }

  handleRemoveUserFromGroup() {
    this.props.removeUserFromGroup(this.props._id);
  }

  render() {
    return (
      <div className="friend">
        <img src={this.props.picture} alt={this.props.name} />
        <h5>{this.props.name}</h5>
        {this.props.add ? <button onClick={this.handleAddUserToGroup}>Add</button> : ''}
        {this.props.remove ? <button onClick={this.handleRemoveUserFromGroup}>Remove</button> : ''}
      </div>
    );
  }
}

export default Friend;
