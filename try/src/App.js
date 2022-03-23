import React, {useState, useEffect} from "react"
import parse from 'html-react-parser'

function App() {   
    
    const [drawArr, setDrawArr] = useState(["hh", "hbs", "mh", "mt"])

    /*
    useEffect(() => {
        const helpArr = shuffle(teams)
        setDrawArr(helpArr)
    }, [])
    */

    const shuffle = (arr) => {
        let index = arr.length
        let randomIndex 
    
        while (index !== 0) {
            randomIndex = Math.floor(Math.random() * index)
            --index;
    
            [arr[index], arr[randomIndex]] = [arr[randomIndex], arr[index]]
        }
    
        return arr
    }

    const handleDraw = () => {
        const draw =  shuffle([...drawArr])
        setDrawArr(draw)
        console.log("Shuffle", draw);
    }

    let all = ''
    for (let i = 0; i < drawArr.length; i+=2) {
        all += 
            `<div className="draw"><p key=${drawArr[i]}>${drawArr[i]}</p> vs <p key=${drawArr[i+1]}>${drawArr[i+1]}</p></div>`
    }

    console.log(all)

    return (
        <div>
            <button onClick={handleDraw}>draw</button>
            <div>
            {parse(all)}
            </div>
        </div>
    )
}

export default App