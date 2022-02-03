import './App.css';
import CardData from './data/data'
import Card from './components/Card';
import Navbar from './components/Navbar'

function App() {
  const cards = CardData.map(card => 
    <Card 
      key={card.id}
      card={card}
    />
  )
  return (
    <div className="App">
      <Navbar />
      <div className="cards-container"> 
        {cards}
      </div>
    </div>
  );
}

export default App;
