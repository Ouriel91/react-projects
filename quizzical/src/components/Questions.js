import React, {useEffect, useState} from 'react'
import { useNavigate  } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Emoji from "react-emoji-render";
import '../styles/Questions.css'

function Questions() {

    const [data, setData] = useState([])
    const [score, setScore] = useState(Number.MAX_SAFE_INTEGER)
    const [checkOrRematch, setCheckOrRematch] = useState(true)

    useEffect(() => {
        console.log("first") //prevent somehow from useEffect run twice
        if(checkOrRematch){
            getData()
            setScore(Number.MAX_SAFE_INTEGER)
        }
    },[checkOrRematch])

    const getData = async() => {
        const response = await fetch('https://opentdb.com/api.php?amount=5')
        const data = await response.json()
        const results = data.results
        const helpArr = []
        const allAnswers = []

        for (let i = 0; i < results.length; i++){

            const index = results[i]
            let question_text = index.question
            const question = question_text
                .replace(/&quot;/g, '"')
                .replace(/&#039;/g, "'")
                .replace('&amp;', '&')
                .replace(/&lt;/g,'<')
                .replace(/&gt;/g,'>')
                 //fix escape chars problems
            const incorrect_answers = index.incorrect_answers
            const allAnswersShuffle = []
            let correct_index = 0

            addAllAnswers(index ,allAnswers, incorrect_answers)
            shuffleAllAnswers(allAnswers, allAnswersShuffle)
            correct_index = findCorrectAnswerIndex(allAnswersShuffle, index)
            setDataObject(correct_index, question, allAnswersShuffle, index, helpArr)
        }

        setData(helpArr)
    }

    const addAllAnswers = (index, allAnswers, incorrect_answers) => {
        let correctAnsText = index.correct_answer
        const correctAns = correctAnsText
            .replace(/&quot;/g, '"')
            .replace(/&#039;/g, "'")
            .replace('&amp;', '&')
            .replace(/&lt;/g,'<')
            .replace(/&gt;/g,'>')
        allAnswers.push(correctAns)
        
        for(let i = 0; i <incorrect_answers.length; i++){
            let inCorrectAnsText = incorrect_answers[i]
            const inCorrectAns = inCorrectAnsText
                .replace(/&quot;/g, '"')
                .replace(/&#039;/g, "'")
                .replace('&amp;', '&')
                .replace(/&lt;/g,'<')
                .replace(/&gt;/g,'>')
            allAnswers.push(inCorrectAns)
        }
    }

    const shuffleAllAnswers = (allAnswers, allAnswersShuffle) => {
        while(allAnswers.length > 0){ 
            const generatedIndex = Math.floor(Math.random() * allAnswers.length)
            allAnswersShuffle.push(allAnswers[generatedIndex])
            allAnswers.splice(generatedIndex, 1)
        }
    }

    const findCorrectAnswerIndex = (allAnswersShuffle, index) => allAnswersShuffle.findIndex(element => element === index.correct_answer)
    
    const setDataObject = (correct_index, question, allAnswersShuffle, index, helpArr) => {
        helpArr.push({
            correct_ans_id: correct_index,
            question: question,
            allAnswers: allAnswersShuffle,
            correct_ans: index.correct_answer,
            //default values for continue
            isHeld: false,
            selected_ans: 100,
            classNames: ["answers", "answers", "answers", "answers"]
        })
    }

    const questionsAndAnswers = data.map((element, item_ind) => (
        <div key={item_ind} className="ques-and-ans-unit">
            <p className="question">{element.question}</p>
            <div className="ans-container">
                {element.allAnswers.map((answer, ans_ind) => (
                    <div 
                        key={ans_ind} 
                        className={element.classNames[ans_ind]}  
                        onClick={() => selectOrCancelSelectAns(item_ind, ans_ind)}>
                        <p className="answer">{answer}</p>
                    </div>
                ))}
            </div>
        </div>
    ))

    const selectOrCancelSelectAns = (item_ind, ans_ind) => {
        
        let dataArr = [...data]

        let isHeld = false
        let selected = 100
        let classNames = ["answers", "answers", "answers", "answers"]

        if(dataArr[item_ind].isHeld && dataArr[item_ind].selected_ans === ans_ind) {
            isHeld = false
            selected = 100
            classNames = ["answers", "answers", "answers", "answers"]
        }

        if(dataArr[item_ind].selected_ans !== ans_ind) {
            isHeld = true;
            selected = ans_ind
            classNames[selected] = "answers held"
        }
        
        let item = {
            ...dataArr[item_ind],
            isHeld : isHeld,
            selected_ans: selected,
            classNames: classNames
        }

        dataArr[item_ind] = item

        setData(dataArr)
    }
    
    const showScoreAndCorrectAnswers = () => {

        const count = calcScore()

        const tempData = calcAnswers()
        
        setData(tempData)
        setScore(count)
        setCheckOrRematch(prevState => !prevState)
    }

    const calcScore = () => {

        let count = 0

        data.forEach((item) => {
            if(item.correct_ans_id === item.selected_ans){
                count += 20
            }
        })

        return count
    }

    const calcAnswers = () => {
        let tempData = [...data]

        for(let i = 0; i < data.length; i++) {
            let classNames = data[i].classNames
            let cnArr = []

            for(let j = 0; j < classNames.length; j++) {
                
                if(j === data[i].correct_ans_id){
                    cnArr.push("answers correct")
                }
                else if(j === data[i].selected_ans) {
                    cnArr.push("answers incorrect")
                }
                else{
                    cnArr.push("answers")
                }
            }

            let item = {
                ...tempData[i],
                classNames: cnArr
            }

            tempData[i] = item
        }

        return tempData
    }


    console.log(data)

    const showEmojie = () => {
        const emojies = ["????","????","????","????","????","????"]
        const calc = score / 20

        return score === 0 ? emojies[0] : emojies[calc]
    }

    let navigate = useNavigate();


    return (
        <div className="questions-container">
            <FontAwesomeIcon 
                icon={faCircleArrowLeft} 
                onClick={() => navigate('/')}
                className="back-icon" />
                <div className="ques-and-ans-container">
                    {questionsAndAnswers}
                </div>

                <div className="button-and-score-container">
                    <div className="score">
                        {score === Number.MAX_SAFE_INTEGER ? "" : ("Final score: " +score)} 
                        {score === Number.MAX_SAFE_INTEGER 
                            ? null : 
                        <span role="img" aria-label="dog">{showEmojie()}</span>}
                    </div>
                    <button 
                        className="check-answers-btn"
                        onClick={showScoreAndCorrectAnswers}>
                        {score === Number.MAX_SAFE_INTEGER ? "Check Answers" : "Rematch"}
                    </button>
                </div>
        </div>
    )
}

export default Questions