import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import Start from './components/Start'
import Questions from './components/Questions'

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/questions" element={<Questions />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
