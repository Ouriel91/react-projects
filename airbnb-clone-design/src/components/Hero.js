import React from 'react';
import '../styles/Hero.css'
import photoGrid from '../images/photo-grid.png';

function Hero() {
  return (
    <section className="hero">
        <img className="photo-grid" src={photoGrid} alt="nav-grid" />
        <h1 className="title">Online Experience</h1>
        <p className="content">
            Join unique interactive activities led by one-of-a-kind hosts—all without leaving home.
        </p>
    </section>
    );
}

export default Hero;
