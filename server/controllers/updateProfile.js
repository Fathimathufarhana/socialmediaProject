
import express from "express"
import User from "../models/User.js"

const updateProfile = async(req,res) => {
    const { id } = req.params
    const { firstname, lastname, email, password } = req.body
    if(!firstname){
        return res.status(400).json({message:"firstname is required"})
    }if(!lastname){
        return res.status(400).json({message:"lastname is required"})
    }if(!email){
        return res.status(400).json({message:"email is required"})
    }if(!password){
        return res.status(400).json({message:"password is required"})
    } if (!req.file) {
        return res.status(400).json({ message: "upload an image" });
      }
      const profilePicture=req.file.filename
      console.log(profilePicture,"profile");
/////////////////////////////////////////////////////////////////////////////////////////////////////////
    try {
        const updateedUser = await User.findByIdAndUpdate(id, { $set: { firstname, lastname, email, password, profilePicture } }, { new: true })
    } catch (error) {
        res.json(error.message)
    }
}


export default updateProfile