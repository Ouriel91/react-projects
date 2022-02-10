import React , {useEffect, useState} from 'react';
import './App.css';

import Table from './components/Table'
import Bar from './components/Bar'

function App() {

  return (
    <div className="App">
      <div className="comp-container table-container">
        <Table />
      </div>  
      <div className="comp-container bar-container">    
        <Bar />
      </div>
    </div>
  );
}

export default App;
