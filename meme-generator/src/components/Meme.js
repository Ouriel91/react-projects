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

    const handleChange = (e) => {
        const {name, value} = e.target
        setMeme(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className="meme-container">
            <form className="meme-form" onSubmit={handleSubmit}>
                <div className="input-container">
                    <input 
                        type="text" 
                        className="inputs" 
                        placeholder="text above"
                        name="topText"
                        onChange={handleChange}
                        value={meme.topText} />
                    <input 
                        type="text" 
                        className="inputs" 
                        placeholder="text below"
                        name="bottomText"
                        onChange={handleChange}
                        value={meme.bottomText} />
                </div>
                <button 
                    className="generate-button"
                    onClick={generateMemeImage}>
                    Get a new image meme.🖼
                </button>
            </form>

            <div className="meme">
                <img
                    className="meme-image" 
                    src={meme.randomImage} 
                    alt="meme-frame" />
                <h2 className="meme-text top-text">{meme.topText}</h2>
                <h2 className="meme-text bottom-text">{meme.bottomText}</h2>
            </div>
        </div>
    );
}

export default Meme;
