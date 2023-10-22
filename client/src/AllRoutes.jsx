import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './Pages/Home/Home'
import Auth from './Pages/Auth/Auth'
import Questions from './Pages/Questions/Questions'
import AskQuestion from './Pages/AskQuestion/AskQuestion'
import DisplayQuestions from './Pages/Questions/DisplayQuestions'
import Tags from './Pages/Tags/Tags'
import Users from './Pages/Users/Users'
import UserProfile from './Pages/UserProfile/UserProfile'
import Feed from './Pages/Feed/feed'
import FeedForm from './Pages/Feed/feedForm'
import SingleFeed from './Pages/Feed/singleFeed'

function AllRoutes () {
  return (
    <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/Auth" element={<Auth/>}/>
        <Route exact path="/Questions" element={<Questions/>}/>
        <Route exact path="/AskQuestion" element={<AskQuestion/>}/>
        <Route exact path="/Questions/:id" element={<DisplayQuestions/>}/>
        <Route exact path="/Tags" element={<Tags/>}/>
        <Route exact path="/Users" element={<Users/>}/>
        <Route exact path="/Users/:id" element={<UserProfile/>}/>
        <Route exact path="/feed" element={<Feed/>}/>
        <Route exact path="/feed/:id" element={<SingleFeed/>}/>
        <Route exact path="/uploadFeed" element={<FeedForm/>}/>
    </Routes>
  )
}

export default AllRoutes