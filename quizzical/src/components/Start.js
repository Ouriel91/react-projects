import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Start.css'

function Start() {

    return (
        <div className="container">
            <h1 className="title">Quizzical</h1>
            <h4>Trivia Game</h4>
            <Link to="/questions">
                <button type="button" className="start-game-btn">
                     Start Quiz
                </button>
            </Link>
        </div>
    )
}

export default Start