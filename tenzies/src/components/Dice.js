import React from 'react'
import '../styles/Dice.css'
import Parser from 'html-react-parser';

function Dice({num, isHeld, holdDice}) {

  const styles = {
    backgroundColor: isHeld ? '#59E391' : '#fff'
  }

  const diceDots = () =>{
    let retVal = ''

    if(num >=1 && num <= 3){
      for(let i = 0; i < num; i++){
        retVal += returnDots()
      }
    }

    if(num === 4 || num === 6){
      retVal = fourOrSixDots(retVal)
    }

    if(num === 5){
        retVal = twoDots() + middleDot() + twoDots()
    }

    return retVal
  }

  const returnDots = () => '<span class="dot"></span>'
  const returnCols = (dots) => '<div class="column">' + dots + '</div>'
  const middleDot = () => '<div class="column"><span class="dot"></span></div>'

  const fourOrSixDots = (retVal) => {
    for(let i = 0; i < num/2; i++){
      let dots = ''
      for(let j = 0; j<2; j++){
        dots += returnDots()
      }
      const cols = returnCols(dots) 
      retVal += cols
    }

    return retVal
  }

  const twoDots = () => {
    let dots = ''
    let ret  = ''
    for(let i = 0; i<2; i++){
      dots += returnDots()
    }
    let cols = returnCols(dots)
    ret += cols

    return ret
  }

  const faceClass = ['first-face','second-face','third-face','fourth-face','fifth-face','sixth-face'] 

  return (
    <div className={`dice ${faceClass[num - 1]}`} 
      style={styles}
      onClick={holdDice}>
        {Parser(diceDots())}
      </div>
  )
}

export default Dice