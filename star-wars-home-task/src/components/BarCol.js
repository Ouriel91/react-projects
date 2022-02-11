import React from 'react';
import '../styles/BarCol.css'

function BarCol({height, planetName, population}) {

    const getRandomColor = () =>  
        Math.floor(Math.random()*16777215).toString(16)
    
    return (
        <div className="barcol-container">
            <span>{population}</span>
            <div className="barcol"  
                style={{
                height:`${height}px`, backgroundColor:`#${getRandomColor()}`,
                }}>
            </div>
            <h3>{planetName}</h3>
        </div>
  );
}

export default BarCol;
