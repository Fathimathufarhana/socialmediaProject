import mongoose from "mongoose";


const UserOTPverificationSchema = new mongoose.Schema({
   userId:String,
   otp:String,
   createdAt:Date,
   expiresAt:Date,
});

const UserOTPverification = mongoose.model("UserOTPverification", UserOTPverificationSchema);

export default UserOTPverification;