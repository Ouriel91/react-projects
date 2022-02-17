import React, {useState, useEffect} from 'react'
import '../styles/Main.css'
import Dice from './Dice'
import Confetti from 'react-confetti'

function Main() {

  const generateDices = () => {
    const dicesArr = []
    for (let i = 0; i < 10; i++) {
      dicesArr.push(generateNewDice(i))
    }
    
    return dicesArr
  }

  const generateNewDice = (i) => {
    return {
        id:i, 
        num :generateRandomNumber(), 
        isHeld :false
    }
  }

  const generateRandomNumber = () => Math.ceil(Math.random() * 6)

  const [dices, setDices] = useState(() => generateDices())
  const [tenzies,setTenzies] = useState(false)
  const [moves,setMoves] = useState(1)
  const [highScore,setHighScore] = useState(
    () => JSON.parse(localStorage.getItem('highScore')) || Number.MAX_SAFE_INTEGER
  )

  const rollDices = () => {

    if(tenzies){
      setTenzies(false)
      setDices(prevState => prevState.map((dice, index) => generateNewDice(index)))
      setMoves(1)
      return
    }

    setMoves(prevState => prevState + 1)
    setDices(prevState => prevState.map((dice, index) => {
      return dice.isHeld ? 
        dice : 
        generateNewDice(index)
    }))
  }

  const holdDice = (id) => {

    setDices(prevState => prevState.map(dice => {
      return dice.id === id ? {...dice, isHeld: !dice.isHeld} : dice
    }))
  }

  const dicesGroup = dices.map(dice => 
    <Dice 
      key={dice.id} 
      num={dice.num} 
      isHeld={dice.isHeld}
      holdDice={() => holdDice(dice.id)}/>
  )

  const rollRematch = tenzies ? 'Rematch' : 'Roll'

  const winingCheck = () => {

    const isAllHeld = dices.every(dice => dice.isHeld)
    const checkValue = dices[0].num
    const isAllDicesHaveSameValue = dices.every(dice => dice.num === checkValue)

    if(isAllHeld && isAllDicesHaveSameValue){
      setTenzies(true)

      if(moves < localStorage.getItem('highScore')){
        setHighScore(moves)
      }
    }
  }

  useEffect(() => {
    winingCheck()
  },[dices])

  useEffect (() => {
    localStorage.setItem('highScore', highScore)
  },[highScore])

  return (
    <div>
      <div className="score-container">
        <h3>Moves: {moves}</h3>
        <h3>High Score: {highScore}</h3>
      </div>      
      {tenzies && <Confetti />}
      <main className="board-container">
          <h1>Tenzies</h1>
          <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className="dices-container">
            {dicesGroup}        
          </div>
          <button className="roll-rematch" onClick={rollDices}>{rollRematch}</button>
      </main>
    </div>
  )
}

export default Main