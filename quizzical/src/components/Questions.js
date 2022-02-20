import React, {useEffect, useState} from 'react'
import { useNavigate  } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons'
import '../styles/Questions.css'

function Questions() {

    const [data, setData] = useState([])

    useEffect(() => {
        console.log("first") //prevent somehow from useEffect run twice
        getData()
    },[])

    const getData = async() => {
        const response = await fetch('https://opentdb.com/api.php?amount=5')
        const data = await response.json()
        const results = data.results
        const helpArr = []
        const allAnswers = []

        for (let i = 0; i < results.length; i++){

            const index = results[i]
            let question_text = index.question
            const question = question_text.replace(/&quot;/g, '"').replace(/&#039;/g, "'") //fix "" and ' problems
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
        const correctAns = correctAnsText.replace(/&quot;/g, '"').replace(/&#039;/g, "'")
        allAnswers.push(correctAns)
        
        for(let i = 0; i <incorrect_answers.length; i++){
            let inCorrectAnsText = incorrect_answers[i]
            const inCorrectAns = inCorrectAnsText.replace(/&quot;/g, '"').replace(/&#039;/g, "'")
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
            //default values
            isHeld: false,
            selected_ans: 100
        })
    }

    const selectOrCancelSelectAns = (item_ind, ans_ind) => {
        
        let dataArr = [...data]

        let isHeld = false
        let selected = 100

        if(dataArr[item_ind].isHeld && dataArr[item_ind].selected_ans === ans_ind) {
            isHeld = false
            selected = 100
        }

        if(dataArr[item_ind].selected_ans !== ans_ind) {
            isHeld = true;
            selected = ans_ind
        }
        

        let item = {
            ...dataArr[item_ind],
            isHeld : isHeld,
            selected_ans: selected
        }

        dataArr[item_ind] = item

        setData(dataArr)
    }

    const questionsAndAnswers = data.map((element, item_ind) => (
            <div key={item_ind} className="ques-and-ans-unit">
                <p className="question">{element.question}</p>
                <div className="ans-container">
                    {element.allAnswers.map((answer, ans_ind) => (
                        <div 
                            key={ans_ind} 
                            className="answers" 
                            onClick={() => selectOrCancelSelectAns(item_ind, ans_ind)}>
                            <p className="answer">{answer}</p>
                        </div>
                    ))}
                </div>
            </div>
    ))
    
    console.log(data)

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

                <button className="check-answers-btn">Check Answers</button>
        </div>
    )
}

export default Questions