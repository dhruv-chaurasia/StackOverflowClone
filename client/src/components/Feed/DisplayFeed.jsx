import React from 'react'
import './DisplayFeed.css'
import { Link ,useLocation,useNavigate} from 'react-router-dom'
import { useSelector, useDispatch} from "react-redux";
import copy from "copy-to-clipboard";
import moment from 'moment'

import Avatar from '../Avatar/Avatar'
import upvote from "../../assets/sort-up.svg";
import downvote from "../../assets/sort-down.svg";
import {LikePost,sharePost,deletePost} from '../../actions/post.js'
const DisplayImages = () => {
  const User = useSelector((state) => state.currentUserReducer);
  
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const url = "https://localhost:5000";
  const handleShare = (id) => {
    copy(url + location.pathname);
    alert("To Post url : " + url + location.pathname + "/"+id);
    if(User != null){
      dispatch(sharePost(id, "Dislike", User.result._id));
    }
  };

  const handleLike = (id) => {
    if(User === null)
    {
      alert("Login to like a post");
      Navigate("/Auth");
    }
    else
    dispatch(LikePost(id,"Like",User.result._id));
  };

  const handleDislike = (id) => {
    if(User === null){
      alert("Login to dislike a post");
      Navigate("/Auth");
    }else
    dispatch(LikePost(id, "Dislike", User.result._id));
  };

  const handleDelete = (id)=>{
    dispatch(deletePost(id));
  }

  const postsList = useSelector((state) => state.postReducer);
  return (
    <div className='image-container'>
        <div className="image-bar-header">
            <h1>All Posts</h1>
            <Link to="/uploadFeed" ><button  className='post-btn'>+ New Post</button></Link>
        </div>
        <div className='Allposts'>
            {
              postsList.data === null ? <h3>Loading feed</h3>:
              <>
                {postsList.data.map(post=>(
                    <div className='post-container' key={post._id}>
                      <div className="post-header">
                      <Link to={`/Users/${post.userId}`} className="user-link" style={{ color: "#0086d8" }}>
                        <Avatar backgroundColor="orange" px="8px" py="5px" borderRadius="4px">{post.userPosted.charAt(0).toUpperCase()}
                        </Avatar>
                        <span className='post-username'>{post.userPosted}</span>
                        <Link to={`/feed/${post._id}`} className='post-link' style={{ color: "orange" }}>ToPost</Link>
                        <Link to={`/Users/${post.userId}`} className="user-link" style={{ color: "#0086d8" }}>
                        {User?.result?._id !== post.userId && (User?.result?.friends.findIndex((element) => element === post.userId) === -1?
                        <p style={{marginLeft:"15px",width:"100px", color: "orange" }}>+Add</p>:
                        <p style={{marginLeft:"15px",width:"100px", color: "orange" }}>-Remove</p>)}
                        </Link>
                        
                      </Link>
                      <p className='post-time'>posted {moment(post.postedOn).fromNow()}</p>
                      </div>
                      <div className='post-body'>
                        {post.image && <img  src={post.image} alt="post-pic" className='post-image'/>}
                        {post.video && <video className='post-image' src={`http://localhost:5000/${post?.video?.filePath}`} controls/>}
                        <div className='post-description'>
                          <h3>Description</h3>
                          <p>{post.postDesc}</p>
                        </div>
                      </div>
                      <div className="post-utilities">
                        <img src={upvote} onClick={()=>handleLike(post._id)} alt="like" width="18" className="likes-icon" id='upvote'/>
                        <img src={downvote} onClick={()=>handleDislike(post._id)} alt="dislike" width="18" className="likes-icon" id='downvote'/>
                        <p>{post.likes.length-post.dislikes.length} likes</p>
                        <button type="button" onClick={()=>handleShare(post._id)}>Share</button> 
                        <p>{post.shares.length} shares</p>
                        {User?.result?._id === post?.userId && (
                            <button type="button" onClick={()=>handleDelete(post._id)}>Delete</button>
                        )}
                      </div>
                    </div>
                ))}
              </>
            }
        </div>
    </div>
  )
}

export default DisplayImages