import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Login from './Login';
import Home from './Home';
import Footer from './Footer';
import '../css/App.css';

const App = props => (
  <div>
    <Header user={props.user} />
    <div className="container">
      {props.user ? <Home user={props.user} /> : <Login />}
    </div>
    <Footer />
  </div>
);

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(App);
