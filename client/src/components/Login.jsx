import React, { Component } from 'react';
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import { login } from '../actions/user';
import '../css/Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.responseFacebook = this.responseFacebook.bind(this);
  }

  responseFacebook(response) {
    this.props.login(response);
  }

  render() {
    return (
      <div className="login">
        <h2>You need a account to access the app</h2>
        <div>
          <FacebookLogin
            appId="484100118656863"
            autoLoad
            fields="name,email,picture"
            scope="public_profile,user_friends,user_friends"
            callback={this.responseFacebook}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps, { login })(Login);
