import React , {useEffect, useState} from 'react';
import Bar from './Bar'
import './App.css';


function App() {

  const [vehicle, setVehicle] = useState({
    pilots: []
  })
  
  const[planetsPopulation, setPlanetsPopulation] = useState([])
  const[largetPopulation, setLargetPopulation] = useState(0)

  const getHeighestSumPopulationData = async() => {
    const rawVehicles = await fetch('https://swapi.py4e.com/api/vehicles/')
    const vehicles = await rawVehicles.json()

    const resArr = vehicles.results
    const fltArr = resArr.filter(res => res.pilots.length > 0)

    for(let i = 0; i < fltArr.length; i++){
        const vehicle = fltArr[i];
        fltArr[i].population = 0

        for(let j = 0; j < vehicle.pilots.length; j++){
          const pilot = vehicle.pilots[j];
          const details = await getPopulation(pilot);
          fltArr[i].population += details.population 
          vehicle.pilots[j] = details
        }
    } 

    let maxIndex = 0
    for(let i =0 ; i <fltArr.length; i++){
      if(fltArr[i].population > fltArr[maxIndex].population){
        maxIndex = i      
      }
    }

    setVehicle(fltArr[maxIndex])
  }

  const getPopulation = async(pilotUrl) => {
    const response = await fetch(pilotUrl)
    const pilot = await response.json();

    const response1 = await fetch(pilot.homeworld)
    const world = await response1.json();

    return {
      population: +world.population, 
      homeworld: world.name, 
      pilotName: pilot.name
    }
  }

  const getFivePlanetsPopulationData = async() => {
    const response = await fetch('https://swapi.py4e.com/api/planets/')
    const data = await response.json()

    const fiveStarsArr = ["Tatooine", "Alderaan", "Bespin", "Endor", "Naboo"]
    const retArr = []

    let max = 0
    data.results.forEach(planet => {
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
    getHeighestSumPopulationData()    
    getFivePlanetsPopulationData()
  },[])

  return (
    <div className="App">
      <h2>Vehicle name with largest sum: {vehicle.name}</h2>
      <div>
        <h3>Related home planet and respective population: </h3>
        {vehicle.pilots.map((pilot) => <p key={pilot.pilotName}>{pilot.homeworld}, {pilot.population}</p>)} 
      </div>
      <div>
        <h3>Related pilot names:</h3>
        {vehicle.pilots.map((pilot) => <span key={pilot.pilotName}>{pilot.pilotName} </span>)}
      </div>

      <div style={{height: '40vh', display: 'flex', verticalAlign: 'top'}}>
        <Bar population={100} height={'50%'} planetName="bla"/>
        <Bar population={102} height={'20%'} planetName="bla"/>
      </div>
    </div>
  );
}

export default App;
