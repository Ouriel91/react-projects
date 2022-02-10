import React, {useState, useEffect} from 'react';
import '../styles/Table.css'

function Table() {

    const [vehicle, setVehicle] = useState({
        pilots: []
    })

    const getHeighestSumPopulationData = async() => {
        const responseVehicles = 
          await fetch('https://swapi.dev/api/vehicles')
        const vehicles = await responseVehicles.json()
    
        const fliteredPilotsArr = 
          vehicles.results.filter(res => res.pilots.length > 0)
    
        for(let i = 0; i < fliteredPilotsArr.length; i++){
            const pilotObj = fliteredPilotsArr[i];
            pilotObj.population = 0 //initial for summarize all population in home planet's pilot
    
            for(let j = 0; j < pilotObj.pilots.length; j++){
              const pilot = pilotObj.pilots[j];
              const pilotDetails = await getPopulation(pilot);
              pilotObj.population += pilotDetails.population //calculate population
              pilotObj.pilots[j] = pilotDetails //update original pilots array, object instead link
            }
        } 
    
        const maxIndex = getMaxPopulationIndex(fliteredPilotsArr)
      
        setVehicle(fliteredPilotsArr[maxIndex])
      }
    
      const getPopulation = async(pilotUrl) => {
        const responsePilot = await fetch(pilotUrl)
        const pilot = await responsePilot.json();
    
        const responseHomeWorld = await fetch(pilot.homeworld)
        const world = await responseHomeWorld.json();
    
        return {
          population: +world.population, 
          homeworld: world.name, 
          pilotName: pilot.name
        }
      }
    
      const getMaxPopulationIndex = (fliteredPilotsArr) => {
        let maxIndex = 0
    
        for(let i =0 ; i <fliteredPilotsArr.length; i++){
          if(fliteredPilotsArr[i].population > fliteredPilotsArr[maxIndex].population){
            maxIndex = i      
          }
        }
    
        return maxIndex
      }

    useEffect(() => {
        getHeighestSumPopulationData()    
    },[])  

  return (
    <div className="table"> 
        <div className="table-row">
        <h3>
            Vehicle name with largest sum: <span className="details-text">{vehicle.name}</span>
        </h3>
        </div>
        <div className="table-row">
        <h3>Related home planet and respective population: </h3>
        {vehicle.pilots.map((pilot) => 
            <span className="details-text" key={pilot.pilotName}>{pilot.homeworld}: {pilot.population}.  </span>)} 
        </div>
        <div>
        <h3>Related pilot names:</h3>
        {vehicle.pilots.map((pilot) => 
            <span className="details-text" key={pilot.pilotName}>{pilot.pilotName} </span>)}
        </div>
    </div>
  );
}

export default Table;
