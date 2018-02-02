import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Alert from './Alert';
import Login from './Login';
import Home from './Home';
import Footer from './Footer';
import { waitLogin } from '../actions/user';
import '../css/App.css';

class App extends Component {
  componentWillMount() {
    this.props.waitLogin();
  }

  render() {
    return (
      <div>
        <Header user={this.props.user} />
        <Alert />
        <div className="container">
          {this.props.user ? <Home user={this.props.user} /> : <Login />}
        </div>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps, { waitLogin })(App);
