import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    firstname: {
        type: String,
        // required : true,
    },
    lastname: {
        type: String,
        // required : true,
    },
    userid: {
        type: String,
        required: true,
    },
    // description:String,
    // postPicture:String,

    description: {
        type: String,
        required: true,
    }, postPicture: {
        type: String,
        required: true,
    },

    profilePicture: String,
    likes: [

        {
            userid: { type: String, required: true },
            islike: { type: Boolean, default: true }

        }
    ],
    comments: [
        {
            userid: String,
            text: String,
        },
    ]
    // comments: {
    //     type : Array,
    //     default:[]
    // }
}, { timestamps: true })

const Post = mongoose.model("Post", postSchema)

export default Post