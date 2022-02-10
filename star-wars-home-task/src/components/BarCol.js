import React from 'react';
import '../styles/BarCol.css'

function BarCol(props) {

    const getRandomColor = () =>  
        Math.floor(Math.random()*16777215).toString(16)
    
    return (
        <div className="barcol-container">
            <span>{props.population}</span>
            <div className="barcol"  
                style={{
                height:props.height, backgroundColor:`#${getRandomColor()}`,
                }}>
            </div>
            <h3>{props.planetName}</h3>
        </div>
  );
}

export default BarCol;
