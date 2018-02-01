import React, { Component } from 'react';

class Alert extends Component {
  componentWillMount() {
    this.props.socket.on('error', (message) => {
      this.setState({
        message,
      });
    });
  }

  render() {
    if (this.state) {
      return (
        <div>
          <h4>{this.state.message}</h4>
        </div>
      );
    }
    return null;
  }
}

export default Alert;
