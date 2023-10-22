import express from "express";

import { getAllPosts } from "../controllers/Posts.js";
import { createPost,likePost,sharePost,deletePost } from "../controllers/Posts.js";

import upload from '../Helpers/fileHelpers.js'

const router = express.Router();
router.get("/get", getAllPosts);
router.post("/posts",upload.single("video"), createPost);
router.patch("/like/:id", likePost);
router.patch("/share/:id", sharePost);
router.patch("/delete/:id", deletePost);

export default router;