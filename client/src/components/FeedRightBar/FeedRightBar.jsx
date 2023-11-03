import React,{useState} from 'react'
import './FeedRightBar.css'
import search from '../../assets/search-solid.svg'
import Allfriends from './Allfriends'
const FeedRightBar = () => {
  const [username, setUsername] = useState("");
  const [look, setLook] = useState("");
  
  const handleSearch = ()=>{
    if(look === "")
    setLook(username);
    else
    {setLook("");}
  }
  // console.log(look);
  return (
    <aside className="feed-right-sidebar">
      <div className='search-friends-container'>
          <div className="search-friends-header">
          <img src={search} className='friend-search-icon' alt='search'width={18}/>
            <input type="search" className='friend-search' onChange={(e)=>setUsername(e.target.value)} value={username} placeholder='Type username here'></input>
            <button onClick={handleSearch} className='post-btn'>{look===""?"Search":"All friends"}</button>
          </div>
          <Allfriends look={look}/>
      </div>
    </aside>
  )
}

export default FeedRightBar