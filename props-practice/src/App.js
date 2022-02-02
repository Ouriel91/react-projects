import './App.css';
import Joke from './components/Joke';
import JokesData from './data/JokesData'

function App() {

  console.log(JokesData);
  const jokeElement = JokesData.map(joke => <Joke 
      setup={joke.setup}
      punchline={joke.punchline}
      key={Math.floor(Math.random() * 10000)} />)

  return (
    <div className="App">
      {jokeElement}
    </div>
  );
}

export default App;
