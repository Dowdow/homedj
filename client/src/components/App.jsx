import React, { Component } from 'react';
import io from 'socket.io-client';
import Header from './Header';
import Alert from './Alert';
import Login from './Login';
import Home from './Home';
import Footer from './Footer';

import '../css/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = io('http://localhost:3000');
    this.state = {
      user: false,
    };
  }

  componentWillMount() {
    this.socket.on('logged', (user) => {
      this.setState({
        user,
      });
    });
  }

  render() {
    return (
      <div>
        <Header user={this.state.user} />
        <Alert socket={this.socket} />
        <div className="container">
          {this.state.user ? <Home socket={this.socket} user={this.state.user} /> : <Login socket={this.socket} />}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
