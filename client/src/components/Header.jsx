import React, { Component } from 'react';
import '../css/Header.css'

class Header extends Component {
  render() {
    return (
      <header>
        <h1>Home DJ</h1>
        <HeaderLogin user={this.props.user} />
      </header>
    );
  }
}

function HeaderLogin(props) {
  if (props.user) {
    return (
      <div>
        <img src={props.user.picture} alt={props.user.name}/>
        <h3>{props.user.name}</h3>
      </div>
    );
  }
  else {
    return (
      <div>
        <img src="" alt=""/>
        <h3>Not connected</h3>
      </div>
    )
  }
}

export default Header;