import React,{useState} from 'react'
import './feedForm.css'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from '../../actions/post';

const ImageForm = () => {
    const [image, setImage] = useState("");
    const [desc, setDesc] = useState("");
    const [title, setTitle] = useState("");
    const [videoFile, setVideoFile] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const User = useSelector((state) => state.currentUserReducer);
    const convertToBase64 = (e)=>{
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload=()=>{
            setImage(reader.result);
        };
        reader.onerror= error =>{
            console.log("Error: ",error);
        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
       
        if(User)
        {
            if (desc && title) {
                const fileData = new FormData();
                fileData.append("title",title);
                fileData.append("desc",desc);
                fileData.append("image",image);
                fileData.append("video",videoFile);
                fileData.append("Uploader",User?.result?._id);
                fileData.append("UploaderName",User?.result?.name);
                
                dispatch(
                    createPost(
                      fileData,
                      navigate
                    )
                  );
            }
        }
        else alert("Login to ask question");
    };

  return (
    <div className="create-post">
        <form encType="multipart/form-data">
            <div className="create-post-container">
                <h1>Create a new post</h1>
                    <div className="create-post-container">
                        <label htmlFor="create-post-title">
                            <h4>Title of post</h4>
                            <p>
                                Write a suitable title for your post
                            </p>
                            <input type="text" name="title" onChange={(e)=>{setTitle(e.target.value)}} value={title} id="post-title" ></input>
                        </label>
                        <label htmlFor="post-description">
                            <h4>Description</h4>
                            <p>
                                Write a description for your post
                            </p>
                            <input type="text" name="desc" onChange={(e)=>{setDesc(e.target.value)}} value={desc} id="post-description" ></input>
                        </label>
                        <label htmlFor="post-file">
                            <h4>Upload your image here</h4>
                            <input type="file" name="image" onChange={convertToBase64} id="post-file" class="form-control-file border" />
                        </label>
                        <label htmlFor="post-video">
                            <h4>Upload your video here</h4>
                            <input type="file" name="video" id='post-video' onChange={(e) => setVideoFile(e.target.files[0])}></input>
                        </label>
                    </div>
                    <input type="submit" onClick={(e)=>handleSubmit(e)} value="upload" className="review-btn"/>
            </div>
            </form>
        </div>
  )
}

export default ImageForm