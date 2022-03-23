import './App.css'
import useWordGame from './hooks/useWordGame'

function App() {

  const {
    text, 
        refTextArea, 
        startGame, 
        handleChangeText, 
        timeRemaining, 
        playGame,
        countWords
  } = useWordGame ()
  
  return (
    <div className="App">
      <h1>How fast do you type?</h1>
      <textarea ref={refTextArea} disabled={!startGame} value={text} onChange={handleChangeText}/>
      <h4>Time Remaining: {timeRemaining}</h4>
      <button disabled={startGame} onClick={playGame}>Start</button>
      <h1>Word Count: {countWords}</h1>
    </div>
  );
}

export default App;
