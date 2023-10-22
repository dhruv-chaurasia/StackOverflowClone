import React from 'react'
import Leftsidebar from '../../components/Leftsidebar/Leftsidebar'
import DisplayFeed from '../../components/Feed/DisplayFeed'
import '../../App.css'
import FeedRightBar from '../../components/FeedRightBar/FeedRightBar'
const Images = () => {
  return (
    <div className='home-container-1'>
        <Leftsidebar/>
        <div className="home-container-2">
            <DisplayFeed/>
            <FeedRightBar/>
        </div>
    </div>
  )
}

export default Images