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

  const rollDices = () => {

    if(tenzies){
      setTenzies(false)
      setDices(prevState => prevState.map((dice, index) => generateNewDice(index)))

      return
    }

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
    }
  }

  useEffect(() => {
    winingCheck()
  },[dices])

  return (
    <div>
      {tenzies && <Confetti />}
      <main className="board-container">
          <h1>Tenzies</h1>
          <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className="dices-container">
            {dicesGroup}        
          </div>
          <button className="roll-refresh" onClick={rollDices}>{rollRematch}</button>
      </main>
    </div>
  )
}

export default Main