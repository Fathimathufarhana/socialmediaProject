// models/Post.js
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  userid: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  postPicture: {
    type: String,
    required: true,
  },
  profilePicture: String,
  likes: [
    {
      userid: { type: String, required: true },
      islike: { type: Boolean, default: true },
    }
  ],
  comments: [
    {
      userid: String,
      text: String,
    }
  ],
   privacy: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Post = mongoose.model("Post", postSchema);

export default Post;
