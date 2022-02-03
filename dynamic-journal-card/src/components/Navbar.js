import React from 'react';
import '../styles/Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons'

function Navbar() {
    return (
        <nav className="navbar"> 
            <p><FontAwesomeIcon icon={faGlobeAmericas} /> my travel journal.</p>        
        </nav>
    );
}

export default Navbar;
