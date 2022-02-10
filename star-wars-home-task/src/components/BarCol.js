import React from 'react';

function BarCol(props) {

    const getRandomColor = () =>  
        Math.floor(Math.random()*16777215).toString(16)
    
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end'}}>
            <span>{props.population}</span>
            <div 
                style={{width: '5vw', minHeight: '5px',
                height:props.height, backgroundColor:`#${getRandomColor()}`,
                margin: '15px',
                alignSelf:'flex-start'}}>

            </div>
            <h3>{props.planetName}</h3>
        </div>
  );
}

export default BarCol;
