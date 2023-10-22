import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
  image:{ type: String,default: []},
  video:{
    fileName: {type:String},
    filePath: {type:String},
    fileType: {type:String},
    fileSize: {type:String},
  },
  title:{type: String,required: "Post much have title"},
  postDesc: { type: String, required: "Post much have desc" },
  likes: { type: [String], default: [] },
  dislikes: { type: [String], default: [] },
  shares: { type: [String], default: [] },
  userPosted: { type: String, required: "Post must have an author" },
  userId: { type: String },
  postedOn: { type: Date, default: Date.now },
});

export default mongoose.model("Posts", PostSchema);
