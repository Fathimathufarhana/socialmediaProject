import express from "express";
import { getAllUser, getUser, login, register, updateUser } from "../controllers/authController.js";
import multer from "multer";
import path from "path"



const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Save uploaded files to the 'uploads' directory
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, Date.now() + ext); // Append timestamp to filename to avoid collisions
    },
  });
  
  const upload = multer({ storage });

  
  router.post('/register',upload.single('profilePicture'),register);
  router.post('/login',login);
  router.get('/:id', getUser);
  router.get('/getdata', getAllUser);
  
  router.put("/updateuser/:id",upload.single('profilePicture'),updateUser)






export default router