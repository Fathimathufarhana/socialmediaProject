import { model,Schema } from "mongoose";

const UserSchema = new Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
       
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    profilePicture:{
        type:String,
        required:true
    }
},{ timestamps: true })

const User = model("User", UserSchema);
export default User;