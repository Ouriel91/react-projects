import React from 'react';
import '../styles/Header.css'
import logo from '../images/troll-face.png';

function header() {
  return (
    <nav className="nav">
        <div className="title-container">
            <div className="logo-container">
                <img className="logo" src={logo} alt="meme-generator-icon" />
                <h1 className="title">Meme Generator</h1>
            </div>
            <div className="info-container">
                <h4>React Course - Project 3</h4>
            </div>
        </div>

    </nav>
    );
}

export default header;
