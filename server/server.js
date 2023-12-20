import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import router from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import {fileURLToPath} from 'url';
import { dirname,join } from "path";
// import profileRouter from "./routes/updateProfileRoute.js";

const __filename =fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

const app =  express()

app.use(express.json());
app.use(cors());
app.use(morgan("common"));
app.use(bodyParser.urlencoded({ extended: false }));


dotenv.config()

app.use('/uploads',express.static(join(__dirname,'uploads')))
app.use("/api/user" , router);
app.use("/posts", postRoutes);
// app.use("/",profileRouter);



const connect = async (req,res)=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error.message);
    }
}
app.listen(process.env.PORT,() =>{
    connect();
    console.log(`Server running on PORT ${process.env.PORT}`);

})