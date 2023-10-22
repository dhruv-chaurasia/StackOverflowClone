import React from 'react'
import {useLocation,useNavigate} from 'react-router-dom'
import './Homemainbar.css'
import QuestionList from './QuestionList'
import { useSelector } from "react-redux";

function Homemainbar() {
    // let questionsList = [{
    //     _id: "1",
    //     upVotes: 3,
    //     downVotes: 2,
    //     noOfAnswers: 2,
    //     questionTitle: "qwerty",
    //     questionTags: ["R", "Python"],
    //     body: "This is body",
    //     askedOn: "jan1",
    //     userPosted:"Prasad",
    //     userId:1,
    //     answer:[{
    //         answerBody:"answer",
    //         answeredOn:"2-jan",
    //         userAnswered:"Paddy",
    //         userId:1
    //     },
    //     {
    //         answerBody:"answer",
    //         answeredOn:"2-jan",
    //         userAnswered:"Paddy",
    //         userId:2
    //     }]
    // },
    // {
    //     _id: "2",
    //     upVotes: 3,
    //     downVotes: 2,
    //     noOfAnswers: 2,
    //     questionTitle: "qwerty",
    //     questionTags: ["R", "Python"],
    //     body: "This is body",
    //     askedOn: "jan1",
    //     userPosted:"Prasad",
    //     userId:1,
    //     answer:[{
    //         answerBody:"answer",
    //         answeredOn:"2-jan",
    //         userAnswered:"Paddy",
    //         userId:1
    //     },
    //     {
    //         answerBody:"answer",
    //         answeredOn:"2-jan",
    //         userAnswered:"Paddy",
    //         userId:2
    //     }]
    // },
    // {
    //     _id: "3",
    //     upVotes: 3,
    //     downVotes: 2,
    //     noOfAnswers: 2,
    //     questionTitle: "qwerty",
    //     questionTags: ["R", "Python"],
    //     body: "This is body",
    //     askedOn: "jan1",
    //     userPosted:"Prasad",
    //     userId:1,
    //     answer:[{
    //         answerBody:"answer",
    //         answeredOn:"2-jan",
    //         userAnswered:"Paddy",
    //         userId:1
    //     },
    //     {
    //         answerBody:"answer",
    //         answeredOn:"2-jan",
    //         userAnswered:"Paddy",
    //         userId:2
    //     }]
    // }]
    const questionsList = useSelector((state) => state.questionsReducer);
    const currentUser = useSelector((state) => state.currentUserReducer);
    const location = useLocation()
    const user = 1
    const navigate =  useNavigate()
    const checkAuth = ()=>{
        if(currentUser===null)
        {
            alert("login or signup to ask questions")
            navigate('/Auth')
        }
        else
        navigate("/AskQuestion")
    }
  return (
    <div className='main-bar'>
        <div className="main-bar-header">
            {
                location.pathname === '/'?<h1>Top Questions</h1>:<h1>All Questions</h1>
            }
            <button onClick={checkAuth} className='ask-btn'>Ask Questions</button>
        </div>
        <div>
            {
                questionsList.data === null?
                <h1>Loading...</h1>:
                <>
                    <p>{questionsList.data.length} questions</p>
                    <QuestionList questionList={questionsList.data} />
                </>
            }
        </div>
    </div>
  )
}

export default Homemainbar