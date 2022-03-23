import  {useState, useEffect, useRef} from 'react'

function useWordGame() {
  
    const START_TIME = 5
    const END_TIME = 0
    const INIT_COUNT_WORDS = 0

    const refTextArea = useRef(null)

    const [text, setText] = useState("")
    const [countWords, setCountWords] = useState(INIT_COUNT_WORDS)
    const [timeRemaining, setTimeRemaining] = useState(START_TIME)
    const [startGame, setStartGame] = useState(false)


    useEffect(() => {
        if(startGame && timeRemaining > END_TIME){
        setTimeout(() => {
            setTimeRemaining(prevState => prevState - 1)
        },1000)
        }

        if(timeRemaining === END_TIME){
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
        setTimeRemaining(START_TIME)
        setCountWords(INIT_COUNT_WORDS)
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