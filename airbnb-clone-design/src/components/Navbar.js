import React from 'react';
import navLogo from '../images/airbnb-logo.png';
import '../styles/Navbar.css';

function Navbar() {
  return (
  <nav>
        <div className="logo-container">
            <img className="nav-logo" src={navLogo} alt="nav-logo" />
        </div>
  </nav>
  );
}

export default Navbar;
