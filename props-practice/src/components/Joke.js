import React from 'react';
import '../styles/Joke.css'

function Joke({setup, punchline}) {
  return (
    <div className="joke-container">
        <div className="setup">
            {setup && <p>{setup}</p>} 
        </div>
        <div className="punchline">
            <p>{punchline}</p>
        </div>
    </div>
    );
}

export default Joke;
