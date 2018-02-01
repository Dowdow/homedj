import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import '../css/Login.css';

class Login extends Component {
  responseFacebook(response) {
    this.socket.emit('login', response);
  }

  render() {
    return (
      <div className="login">
        <h2>You need a account to access the app</h2>
        <div>
          <FacebookLogin
            appId="484100118656863"
            autoLoad={true}
            fields="name,email,picture"
            scope="public_profile,user_friends,user_friends"
            callback={this.responseFacebook}
            socket={this.props.socket} />
        </div>
      </div>
    )
  };
}

export default Login