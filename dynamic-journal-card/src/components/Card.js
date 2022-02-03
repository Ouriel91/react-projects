import React from 'react';
import '../styles/Card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

function Card({card}) {


    return (
        <div className="card-container">
            <img className="journal-img" src={card.imageUrl} alt="journal-image"/>
            <div className="info-card">
                <div className="info-location">
                    <FontAwesomeIcon icon={faMapMarkerAlt}  className="map-icon"/>
                    <h3 className="location-name">{card.location}</h3>
                    <h4 className="link-location">
                        <a className="link" href={card.googleMapsUrl} target="_blank">View on Google Maps</a>
                    </h4>
                </div>
                <div className="info-title">
                    <h1 className="title">{card.title}</h1>
                </div>
                <div className="info-date">
                    <h4 className="date">{card.startDate} - {card.endDate}</h4>
                </div>
                <div className="info-description">
                    <p className="description">{card.description}</p>
                </div>
            </div>
        </div>
    );
}

export default Card;
