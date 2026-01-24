import express from 'express'
import houseRoutes from './Routes/houseRoutes.js'
import { connectDB } from './config/db.js'
import dotenv from 'dotenv';
import cors from 'cors'
import authRoutes from "./Routes/authRoutes.js"
import chatRoutes from "./Routes/chatRoutes.js";
import http from "http";
import { Server } from "socket.io";

dotenv.config();
const app = express();

app.use(express.json())

app.use(cors({origin:"http://localhost:5173"}));

app.use("/api/auth", authRoutes);

app.use("/api/houses",houseRoutes);

app.use("/api/chat", chatRoutes);


// app.use((err, req, res, next) => {
//   console.log("🔥 MULTER ERROR:", err);
//   res.status(500).json({ message: "Upload failed", error: err.message });
// });



connectDB();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("🟢 Connected:", socket.id);

  socket.on("joinChat", (chatId) => {
    socket.join(chatId);
  });

  socket.on("sendMessage", async (data) => {
  io.to(data.chatId).emit("receiveMessage", data);

  // After sending message, emit global unread count update
  const userId = data.sender; // sender
  const otherUserId = data.receiver; // you’ll need to include this

  // Calculate unread count for the other user:
  const count = await Message.countDocuments({
    isRead: false,
    sender: { $ne: otherUserId },
    chat: {
      $in: await Chat.find({
        $or: [{ buyer: otherUserId }, { seller: otherUserId }],
      }).distinct("_id"),
    },
  });

  io.emit("unreadCountUpdated", { userId: otherUserId, count });
});

  socket.on("disconnect", () => {
    console.log("🔴 Disconnected");
  });
});

server.listen(3000, () => {
  console.log("🚀 Server running on port 3000");
});