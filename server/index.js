import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from './routes/users.js'
import questionRoutes from "./routes/Questions.js";
import answerRoutes from "./routes/Answer.js"
import postRoutes from "./routes/post.js"

import { fileURLToPath } from 'url';
import { dirname} from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import path from "path";
dotenv.config();

const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get("/",(req,res)=>{
    res.send("This is stack-overflow-clone api")
})
app.use("/user", userRoutes);
app.use("/questions", questionRoutes);
app.use("/answer",answerRoutes);
app.use("/feed",postRoutes);


const DATABASE_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT||5000
mongoose.connect(DATABASE_URL,{useNewURlParser:true, useUnifiedTopology:true})
.then(()=>app.listen(PORT,()=>{console.log(`server started at ${PORT}`);}))
.catch((err)=>console.log(err.message))

