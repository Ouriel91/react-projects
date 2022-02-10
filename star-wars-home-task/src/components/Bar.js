import React, {useState, useEffect} from 'react';
import BarCol from './BarCol'

function Bar() {

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
        <div style={{height: '40vh', display: 'flex'}}>
            {planetsPopulation.map(planet => 
                <BarCol 
                    key={planet.name} 
                    population={planet.population} 
                    height={`${Math.floor((planet.population/largetPopulation)*100)}%`} 
                    planetName={planet.name}/>    
            )}
            
        </div>
    );
}

export default Bar;
