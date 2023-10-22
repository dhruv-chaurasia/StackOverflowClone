import React from 'react'
import PostDetails from '../../components/Feed/Postedetails'

const SingleFeed = () => {
  return (
    <div className='post-home-container-1' style={{margin:"40px 0px 0px 0px"}}>
        <div className="home-container-2" style={{width:"660px",marginLeft:"250px"}}>
            <PostDetails/>
        </div>
    </div>
  )
}

export default SingleFeed

