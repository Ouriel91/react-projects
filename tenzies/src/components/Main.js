import React from 'react'
import '../styles/Main.css'
import Dice from './Dice'

function Main() {

  const generateRandomNumber = () => Math.floor(Math.random() * 6) + 1
  const dicesArr = []
  for (let i = 0; i < 10; i++) {
    dicesArr.push({id:i, num : generateRandomNumber()})
  }

  const dices = dicesArr.map(dice => <Dice key={dice.id} num={dice.num}/>)

  return (
    <main className="board-container">
        <h1>Tenzies</h1>
        <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dices-container">
          {dices}        
        </div>
        <button className="roll-refresh">Roll</button>
    </main>
  )
}

export default Main