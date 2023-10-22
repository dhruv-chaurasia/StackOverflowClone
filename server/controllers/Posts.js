import mongoose from "mongoose";
import Post from "../models/post.js";

export const createPost = async(req,res,next)=>{
  if(req.file === undefined){
    res.status(404).json({message:"Pla upload a mp4 video"})
  }
    try {
      const {title,Uploader,UploaderName,desc,image} = req.body;
      const video = req.file;
      const file = new Post({
        title: title,
        video:{
          fileName: video.originalname,
          filePath: video.path,
          fileType: video.mimetype,
          fileSize: video.size,
        },
        userId: Uploader,
        userPosted: UploaderName,
        postDesc:desc,
        image:image,
      });
        await file.save();
        res.status(200).json("Posted a question successfully");
    } catch (error) {
        console.log(error);
        res.status(409).json("Couldn't create a new post");
    }
}

export const getAllPosts = async (req, res) => {
  
    try {
      const PostList = await Post.find();
      res.status(200).json(PostList);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };

  export const likePost = async (req, res) => {
    const { id: _id } = req.params;
    const { value, userId } = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("Post unavailable...");
    }
  
    try {
      const post = await Post.findById(_id);
      const upIndex = post.likes.findIndex((id) => id === String(userId));
      const downIndex = post.dislikes.findIndex((id) => id === String(userId));
  
      if (value === "Like") {
        if (downIndex !== -1) {
          post.dislikes = post.dislikes.filter(
            (id) => id !== String(userId)
          );
        }
        if (upIndex === -1) {
          post.likes.push(userId);
        } else {
          post.likes = post.likes.filter((id) => id !== String(userId));
        }
      } else if (value === "Dislike") {
        if (upIndex !== -1) {
          post.likes = post.likes.filter((id) => id !== String(userId));
        }
        if (downIndex === -1) {
          post.dislikes.push(userId);
        } else {
          post.dislikes = post.dislikes.filter(
            (id) => id !== String(userId)
          );
        }
      }
      await Post.findByIdAndUpdate(_id, post);
      res.status(200).json({ message: "Liked or disliked successfully..." });
    } catch (error) {
      res.status(404).json({ message: "id not found" });
    }
  };

  export const sharePost = async (req, res) => {
    const { id: _id } = req.params;
    const {userId } = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("Post unavailable...");
    }
  
    try {
      const post = await Post.findById(_id);
      const Index = post.shares.findIndex((id) => id === String(userId));
  
        if (Index === -1) {
          post.shares.push(userId);
        } 
      await Post.findByIdAndUpdate(_id, post);
      res.status(200).json({ message: "Shared successfully..." });
    } catch (error) {
      res.status(404).json({ message: "id not found" });
    }
  };

  export const deletePost = async (req, res) => {
    const { id: _id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).send("Post unavailable...");
    }
  
    try {
      await Post.findByIdAndRemove(_id);
      res.status(200).json({ message: "successfully deleted..." });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };