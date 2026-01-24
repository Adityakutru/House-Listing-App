import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  startChat,
  getBuyerChats,
  getSellerChats,
  getMessages,
  sendMessage,
  getChatMeta,
  getUnreadCount,
} from "../controllers/chatController.js";

const router = express.Router();

router.post("/start", authMiddleware, startChat);
router.get("/buyer", authMiddleware, getBuyerChats);
router.get("/seller", authMiddleware, getSellerChats);
router.get("/meta/:chatId", authMiddleware, getChatMeta);
router.get("/:chatId/messages", authMiddleware, getMessages);
router.post("/message", authMiddleware, sendMessage);
router.get("/unread/count", authMiddleware, getUnreadCount);

export default router;
