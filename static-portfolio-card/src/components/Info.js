import React from 'react';
import '../styles/Info.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'

function Info() {
  return (
  <div className="info-container">
    <div className="thumbnail">
      
    </div>
    
    <div className="info-details">
      <h1 className="name">Ouriel Ohayon</h1>
      <h2 className="profession">Fullstack & mobile Developer</h2>
      <h3 className="site">My.site</h3>
      <div className="links">
        <button className="email">
          <FontAwesomeIcon icon={faEnvelope} /> Email
        </button>
        <button className="linkedin">
          <FontAwesomeIcon icon={faLinkedin} />  Linkedin
        </button>
      </div>
    </div>      
  </div>
  );
}

export default Info;
