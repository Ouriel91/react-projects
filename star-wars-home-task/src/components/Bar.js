import React, {useState, useEffect} from 'react';
import BarCol from './BarCol'
import '../styles/Bar.css'

function Bar() {

    const[planetsPopulation, setPlanetsPopulation] = useState([])

    const getFivePlanetsPopulationData = async() => {
        const response = await fetch('https://swapi.dev/api/planets')
        const planetsData = await response.json()

        getPlanetsDataAndCalculateBarColPlanet(planetsData)
    }

    const getPlanetsDataAndCalculateBarColPlanet = (planetsData) => {    
        const fiveStarsArr = ["Tatooine", "Alderaan", "Bespin", "Endor", "Naboo"]
        const retArr = []

        planetsData.results.forEach(planet => {
        if(fiveStarsArr.includes(planet.name)){
            retArr.push({
                name:planet.name,
                population: +planet.population
            })
        }
        })

        retArr.sort((a,b) => b.population - a.population)
        let maxHeight = 200

        for(let i = 0 ; i < retArr.length; i++){
            retArr[i].height = maxHeight
            maxHeight -= 40 
        }

        setPlanetsPopulation(retArr)
    }

    useEffect(() => {
        getFivePlanetsPopulationData()
    },[])

    return (
        <div className="bar-container">
            {planetsPopulation.map(planet => 
                <BarCol 
                    key={planet.name} 
                    population={planet.population} 
                    height={planet.height}
                    planetName={planet.name}/>    
            )}
            
        </div>
    );
}

export default Bar;
