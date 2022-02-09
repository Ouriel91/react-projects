import React from 'react';

function Bar(props) {
  return (
    <div>
        <span>{props.population}</span>
        <div 
            style={{width: '5vw', minHeight: '5px',
            height:props.height, backgroundColor:'green',
            margin: '5px',
            alignSelf:'flex-start'}}>

        </div>
        <h3>{props.planetName}</h3>
    </div>
    );
}

export default Bar;
