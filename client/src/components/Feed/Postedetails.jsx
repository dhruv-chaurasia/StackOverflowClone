import React from 'react'
import "../../components/Feed/DisplayFeed.css"
import { Link,useNavigate,useParams} from 'react-router-dom'
import { useSelector, useDispatch} from "react-redux";
import Avatar from '../../components/Avatar/Avatar';
import moment from 'moment';

import upvote from "../../assets/sort-up.svg";
import downvote from "../../assets/sort-down.svg";
import {LikePost,deletePost} from '../../actions/post.js'

const Postdetails = () => {
  let { id } = useParams();
  const postsList = useSelector((state) => state.postReducer);
  const User = useSelector((state) => state.currentUserReducer);
  
  const Navigate = useNavigate();
  const dispatch = useDispatch();

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

  return (
          <div className="single-post-container">
              {
                postsList.data.filter(post=> id === post._id).map(post=>(
                  <div className='post-container' key={post._id}>
                  <div className="post-header">
                  <Link to={`/Users/${post.userId}`} className="user-link" style={{ color: "#0086d8" }}>
                    <Avatar backgroundColor="orange" px="8px" py="5px" borderRadius="4px">{post.userPosted.charAt(0).toUpperCase()}
                    </Avatar>
                    <span className='post-username'>{post.userPosted}</span>
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
                        <p>{post.shares.length} shares</p>
                        {User?.result?._id === post?.userId && (
                            <button type="button" onClick={()=>handleDelete(post._id)}>Delete</button>
                        )}
                      </div>
                </div>
                ))
              }
          </div>
  )
}

export default Postdetails