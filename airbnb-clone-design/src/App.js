import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Card from './components/Card';
import CardData from './data/data'

function App() {
  const cards = CardData.map(card => 
    <Card 
      key={card.id}
      card={card}
    />)
    
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <div style={{display: 'flex', overflowx: 'auto'}}>
       {cards}
      </div>
    </div>
  );
}

export default App;
