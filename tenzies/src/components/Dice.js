import React from 'react'
import '../styles/Dice.css'

function Dice({num, isHeld, holdDice}) {

  const styles = {
    backgroundColor: isHeld ? '#59E391' : '#fff'
  }

  return (
    <div className="dice" 
      style={styles}
      onClick={holdDice}>
        {num}
      </div>
  )
}

export default Dice