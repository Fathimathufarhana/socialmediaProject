import User from "../models/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"
import UserOTPverification from "../models/UserOTPverification.js";


export const register =async (req, res)=> {

    try {
      
      const { firstname, lastname, email, password, privacy} = req.body
      console.log(req.body);
      
      // firstname email
      if (!firstname) {
    return res.status(400).json({ message: "FirstName is required" });
  }
  
  // lastname email
   if (!lastname) {
    return res.status(400).json({ message: "LastName is required" });
  }
  // Validate email
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  
  
  // Validate password
  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  } else if (password.length < 8 || password.length > 16) {
    return res.status(400).json({ message: "Password must be between 8 and 16 characters" });
  }
  
  if (!req.file) {
    return res.status(400).json({ message: "upload an image" });
  }
  const profilePicture=req.file.filename
  // console.log(profilePicture,"profile");
  const isPublic = privacy === "public";

  const saltRounds = 10;
  
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  const newUser = new User({ firstname, lastname, email, password: hash, profilePicture:profilePicture ,privacy: isPublic ,verified:false});
  const savedUser = await newUser.save();
  res.status(200).json(savedUser);
  console.log(savedUser,"user");

    } catch (error) {
       console.log(error.message); 
    }
}








//send otp verification emil
const sendOTPverficationEmail= async ({ _id,email}, res) => {
  try {
    const otp = `${Math.floor(1000 + Math.random() * 9000)}`

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Verify Your Email",
      html: `<p>Enter <b>${otp}</b> in the app to verify your email address and complete the registration </p><p>`,

    }
  } catch (error) {
    
  }
}


let transporter = nodemailer.createTransport({

  host: "smtp-mail.outlook.com",
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS,
  }


})






















export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Validate email
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
  
      // Validate password
      if (!password) {
        return res.status(400).json({ message: "Password is required" });
      } else if (password.length < 8 || password.length > 16) {
        return res.status(400).json({ message: "Password must be between 8 and 16 characters" });
      }
  
      const user = await User.findOne({ email: email });
  
      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }
  
      const isPassword = await bcrypt.compare(req.body.password, user.password);
  
      if (isPassword) {
        const token = jwt.sign({userId: user._id, firstname: user.firstname}, 'your-secret-key', { expiresIn: '1 days' });
        res.json({result:user,token:token});
      } else {
        res.status(404).json({ message: "Incorrect password" });
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  export const getUser=async(req,res)=>{
    const { id } = req.params
    try {
      let getUser=await User.findById(id)
      const {...others} = getUser._doc

// console.log(getUser,"kkkkk");
 let user=getUser.friendlist.map(async(item)=>{
// console.log(item,"item");
let getUserr=await User.findById(item)
// console.log(item,"");
const {...others } = getUserr._doc
// console.log(getUser,"getuser");
return others
})



const result = await Promise.all(user)
others.followers = result


// console.log(others,'others');




// return true

      res.status(201).json(others)
    } catch (error) {
      res.status(404).json({message:error.message || null});
      
    }
  }



  
  export const updatedPrivacy=async(req,res)=>{
 
    // const { privacy,postid } = req.body;
    console.log(req.body,'bodyyy')

    // let privacy = req.body.data === 'public' ? true : false 
let privacy = req.body.data === "public" ? false : true
console.log(privacy,"updated privacy");
  // return true
    try {
      const updatedPost = await User.findByIdAndUpdate(req.body.postid,{ $set:{privacy:privacy} });
      
  
      res.json(updatedPost);
    } catch (error) {
      console.error('Error updating post privacy:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  
export const updateUser = async(req,res) => {
  const { id } = req.params
  const { firstname, lastname, email, password } = req.body

  try {
    let fields = {firstname,lastname,email,password}
    // console.log(fields,"hhhhhhhhhh");
    console.log(req.file,"req.file");
    // if(req.file) {
      const profilePicture=req.file.filename;
      fields.profilePicture=profilePicture;
      
    // }
    
    const updatedUser =await User.findByIdAndUpdate(id , {$set : fields}, {new: true});
    console.log(profilePicture,"updated profile picture");

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    console.log(updatedUser,"updatedUser");
    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(500).json({ message: error.message || 'Internal Server Error' });
    console.log(error.message,"error in updating profile");
  }

}

export const getAllUser = async(req,res) => {
  try {
    const response = await User.find()
    res.json(response)
    console.log(response,"getalldata");
  } catch (error) {
    console.log(error.message);
    res.json(error.message)
  }
}