import React from 'react';
import logo from '../images/react-small.png';
import '../styles/Navbar.css'

function Navbar() {
  return (
    <nav>
      <img src={logo} alt="logo-small" className="nav-logo" />
      <h3 className="nav-logo-text">ReactFacts</h3>
      <h4 className="nav-title">React Course - Project 1</h4>
    </nav>
  );
}

export default Navbar;
