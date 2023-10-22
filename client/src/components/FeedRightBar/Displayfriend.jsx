import React from 'react'
import { Link} from 'react-router-dom'
import Avatar from '../Avatar/Avatar'
import './FeedRightBar.css'
const Displayfriend = ({user}) => {
  return (
    <div className='friend-container'>
        <Link to={`/Users/${user._id}`} className="user-link" style={{ color: "#0086d8" }}>
        <Avatar className='friend-avatar' backgroundColor="purple" color="white" fontSize="20px" px="10px" py="10px">{user.name.charAt(0).toUpperCase()}</Avatar>
        <h3 style={{marginLeft:"10px"}}>{user.name}</h3>
        </Link>
        
    </div>
  )
}

export default Displayfriend