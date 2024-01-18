import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
// import { createServer } from "http";
import router from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import { fileURLToPath } from 'url';
import { dirname, join } from "path";
// import { Server as SocketIOServer } from "socket.io";
// import emitHelloToSocket from '../socket/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
// const server = createServer(app);
// const io = new SocketIOServer(server);

app.use(express.json());
app.use(cors());
app.use(morgan("common"));
app.use(bodyParser.urlencoded({ extended: false }));

dotenv.config();

app.use('/uploads', express.static(join(__dirname, 'uploads')));
app.use("/api/user", router);
app.use("/posts", postRoutes);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
  }
};

// Custom function to check if a socket is connected
// const isSocketConnected = (socketId) => {
//   return !!io.sockets.connected[socketId];
// };

// io.on('connection', (socket) => {
//   console.log('User connected:', socket.id);

//   // Example: Emit a "hello" message to the connected user
//   emitHelloToSocket(io, socket.id);

//   socket.on('privateMessage', (data) => {
//     const { senderId, receiverId, message } = data;
//     io.to(receiverId).emit('privateMessage', { senderId, message });
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//   });

//   // Example usage to check if a socket with a specific ID is connected
//   const specificSocketId = 'someSocketId';
//   console.log(`Is socket ${specificSocketId} connected?`, isSocketConnected(specificSocketId));
// });

app.listen(process.env.PORT, () => {
  connect();
  console.log(`Server running on PORT ${process.env.PORT}`);
});
