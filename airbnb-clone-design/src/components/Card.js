import React from 'react';
import '../styles/Card.css'
import star from '../images/star.png'

function Card({card}) {
    
    let badgeText //undefined initialized
    if(!card.openSpots){
        badgeText = 'Sold out'
    }
    else if (card.location === 'Online')
    {
        badgeText = 'Online'
    }

    return (
        <div className="card-container">
            <div className="image-container">
                <img className="image" src={card.coverImg} alt="poster" /> 
                {badgeText && <p className="sold-or-online">{badgeText}</p>}
            </div>
            <div className="rate-container">
                <img className="star" src={star} alt="star" />
                <span className="rate-text">{card.stats.rating.toFixed(1)}</span>
                <span className="details-text">({card.stats.reviewCount})</span>
                <span className="details-text">{card.location}</span>
            </div>
                <p className="description">{card.title}</p>
                <p className="price"><span className="bold-text">From ${card.price}</span> / person</p>
        </div>
        );
}

export default Card;
