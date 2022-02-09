import React, {useState, useEffect} from 'react';
import '../styles/Meme.css'
import data from '../data/data'

function Meme() {

    const [meme, setMeme] = useState({
        topText: '',
        bottomText: '',
        randomImage: 'http://i.imgflip.com/1bij.jpg'
    })

    const [allMemeImages, setAllMemeImages] = useState(data)

    const generateMemeImage = (e) => {

        e.preventDefault()

        const arr = allMemeImages.data.memes
        const generatedNumber = Math.floor(Math.random() * arr.length)
        const url = arr[generatedNumber].url 

        setMeme(prevState => (
            {
                ...prevState,
                randomImage: url
            }))
    }
    

    return (
        <div className="meme-container">
            <form className="meme-form">
                <div className="input-container">
                    <input 
                        type="text" 
                        className="inputs" 
                        placeholder="text above" />
                    <input 
                        type="text" 
                        className="inputs" 
                        placeholder="text below" />
                </div>
                <button 
                    className="generate-button"
                    onClick={generateMemeImage}>
                    Get a new image meme.🖼
                </button>
            </form>

            <img
                className="meme-image" 
                src={meme.randomImage} 
                alt="meme-image" />

        </div>
    );
}

export default Meme;
