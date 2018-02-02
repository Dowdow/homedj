import React from 'react';
import '../css/Header.css';

const Header = props => (
  <header>
    <h1>Home DJ</h1>
    <div>
      <img src={props.user ? props.user.picture : ''} alt={props.user ? props.user.name : ''} />
      <h3>{props.user ? props.user.name : 'Not connected'}</h3>
    </div>
  </header>
);

export default Header;
