import  {useState, useEffect, useRef} from 'react'

function useWordGame(start_time = 60, 
    end_time = 0, 
    init_count_words = 0) { //used as default props (if not passed in App.js)

    const refTextArea = useRef(null)

    const [text, setText] = useState("")
    const [countWords, setCountWords] = useState(init_count_words)
    const [timeRemaining, setTimeRemaining] = useState(start_time)
    const [startGame, setStartGame] = useState(false)


    useEffect(() => {
        if(startGame && timeRemaining > end_time){
        setTimeout(() => {
            setTimeRemaining(prevState => prevState - 1)
        },1000)
        }

        if(timeRemaining === end_time){
        endGame()
        }
    }, [timeRemaining, startGame])

    const handleChangeText = (e) => {
        const {value} = e.target
        setText(value)
    }
    
    const countWordsInText = (inputText) => {
        const str = inputText.split(' ') //more than one space 
        const countWords = str.filter(word => word !== '').length

        return countWords
    }

    const playGame = () => {
        setStartGame(true)
        setTimeRemaining(start_time)
        setCountWords(init_count_words)
        setText("")
        refTextArea.current.disabled = false
        refTextArea.current.focus()
    }

    const endGame = () => {
        setStartGame(false)
        setCountWords(countWordsInText(text))
    }

    return {
        text, 
        refTextArea, 
        startGame, 
        handleChangeText, 
        timeRemaining, 
        playGame,
        countWords
    }
}

export default useWordGame