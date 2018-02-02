import React, { Component } from 'react';
import { connect } from 'react-redux';
import { waitAlert } from '../actions/alert';

class Alert extends Component {
  componentWillMount() {
    this.props.waitAlert();
  }

  render() {
    if (this.props.message) {
      return (
        <div>
          <h4>{this.props.message}</h4>
        </div>
      );
    }
    return null;
  }
}

function mapStateToProps(state) {
  return {
    message: state.alert,
  };
}

export default connect(mapStateToProps, { waitAlert })(Alert);
