import React, { Component } from 'react';

class Group extends Component {
  constructor(props) {
    super(props);
    this.handleSelectGroup = this.handleSelectGroup.bind(this);
  }

  handleSelectGroup() {
    this.props.selectGroup({
      _id: this.props._id,
      name: this.props.name,
      users: this.props.users,
    });
  }

  render() {
    return (
      <div className="group" onClick={this.handleSelectGroup}>
        <h5>{this.props.name}</h5>
      </div>
    );
  }
}

export default Group;
