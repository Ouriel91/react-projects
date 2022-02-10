import React , {useEffect, useState} from 'react';
import Bar from './Bar'
import './App.css';
import Table from '../components/Table'

function App() {

  
  
  const[planetsPopulation, setPlanetsPopulation] = useState([])
  const[largetPopulation, setLargetPopulation] = useState(0)

  

  const getFivePlanetsPopulationData = async() => {
    const response = await fetch('https://swapi.py4e.com/api/planets/')
    const planetsData = await response.json()

    getPlanetsDataAndMaxPopulation(planetsData)
  }

  const getPlanetsDataAndMaxPopulation = (planetsData) => {    
    const fiveStarsArr = ["Tatooine", "Alderaan", "Bespin", "Endor", "Naboo"]
    const retArr = []

    let max = 0
    planetsData.results.forEach(planet => {
      if(fiveStarsArr.includes(planet.name)){
        retArr.push({
          name:planet.name,
          population: +planet.population
        })

        if(+planet.population > max){
          max = +planet.population
        }
      }
    })

    setLargetPopulation(max)
    setPlanetsPopulation(retArr)
  }

  useEffect(() => {
    getFivePlanetsPopulationData()
  },[])

  return (
    <div className="App">
      <Table />
      <div style={{height: '40vh', display: 'flex', verticalAlign: 'top'}}>
        <Bar population={100} height={'50%'} planetName="bla"/>
        <Bar population={102} height={'20%'} planetName="bla"/>
      </div>
    </div>
  );
}

export default App;
