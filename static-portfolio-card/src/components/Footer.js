import React from 'react';
import '../styles/Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'



function Footer() {
  return (
  <div className="footer-container">
    <FontAwesomeIcon icon={faTwitter} />
    <FontAwesomeIcon icon={faFacebookF} />
    <FontAwesomeIcon icon={faInstagram} />
    <FontAwesomeIcon icon={faGithub} />      
  </div>
  );
}

export default Footer;
