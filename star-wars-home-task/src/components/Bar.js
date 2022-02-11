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
        const fiveStarsArr = ["Tatooine", "Alderaan","Naboo", "Bespin", "Endor"]
        let helperArr = []
        let retArr = []

        helperArr = setPlanetsData(fiveStarsArr, planetsData, helperArr)
        helperArr = setBarColHeight(helperArr)   
        retArr = setDataForBarPreformence(helperArr, retArr, fiveStarsArr)
    
        setPlanetsPopulation(retArr)
    }

    const setPlanetsData = (fiveStarsArr, planetsData, helperArr) => {
        planetsData.results.forEach(planet => {
            if(fiveStarsArr.includes(planet.name)){
                helperArr.push({
                    name:planet.name,
                    population: +planet.population
                })
            }
        })

        return helperArr
    }

    const setBarColHeight = (helperArr) => {
        helperArr.sort((a,b) => b.population - a.population)
        let maxHeight = 200

        for(let i = 0 ; i < helperArr.length; i++){
            helperArr[i].height = maxHeight
            maxHeight -= 40 
        }

        return helperArr
    }

    const setDataForBarPreformence = (helperArr, retArr, fiveStarsArr) => {
        fiveStarsArr.forEach(star => {
            helperArr.forEach(item => {
                if(star.includes(item.name)){
                    retArr.push(item)
                }
            })
        })

        return retArr
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
