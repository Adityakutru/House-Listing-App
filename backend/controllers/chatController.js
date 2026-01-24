import Chat from "../models/chat.model.js";
import Message from "../models/message.model.js";
import House from "../models/house.model.js";

// Buyer clicks "Chat with Owner"
export const startChat = async (req, res) => {
  try {
    const { houseId } = req.body;
    const buyerId = req.user.id;

    const house = await House.findById(houseId);
    if (!house) {
      return res.status(404).json({ message: "House not found" });
    }

    // Prevent owner chatting with self
    if (house.owner.toString() === buyerId) {
      return res.status(400).json({ message: "Cannot chat with yourself" });
    }

    const sellerId = house.owner;

    let chat = await Chat.findOne({
      house: houseId,
      buyer: buyerId,
    });

    if (!chat) {
      chat = await Chat.create({
        house: houseId,
        buyer: buyerId,
        seller: sellerId,
      });
    }

    return res.status(200).json(chat);
  } catch (error) {
    console.error("🔥 startChat error:", error);

    // Handle duplicate chat (unique index)
    if (error.code === 11000) {
      const chat = await Chat.findOne({
        house: req.body.houseId,
        buyer: req.user.id,
      });
      return res.status(200).json(chat);
    }

    return res.status(500).json({
      message: "Failed to start chat",
    });
  }
};



// Get chats for buyer
// Get chats for buyer
export const getBuyerChats = async (req, res) => {
  try {
    const chats = await Chat.find({ buyer: req.user.id })
      .populate("house", "title")
      .populate("seller", "name")
      .populate("buyer", "name")
      .sort("-updatedAt");

      const chatsWithUnread = await Promise.all(
  chats.map(async (c) => {
    const unread = await Message.countDocuments({
      chat: c._id,
      isRead: false,
      sender: { $ne: req.user.id },
    });
    return { ...c.toObject(), unreadCount: unread };
  })
);

res.json(chatsWithUnread);

    // 🔐 remove chats whose house was deleted
    const safeChats = chats.filter(c => c.house !== null);

    res.json(safeChats);
  } catch (err) {
    res.status(500).json({ message: "Failed to load buyer chats" });
  }
};

// Get chats for seller
export const getSellerChats = async (req, res) => {
  try {
    const chats = await Chat.find({ seller: req.user.id }) // ✅ FIXED
      .populate("house", "title")
      .populate("buyer", "name") // ✅ FIXED
      .populate("seller", "name")
      .sort("-updatedAt");

      const chatsWithUnread = await Promise.all(
  chats.map(async (c) => {
    const unread = await Message.countDocuments({
      chat: c._id,
      isRead: false,
      sender: { $ne: req.user.id },
    });
    return { ...c.toObject(), unreadCount: unread };
  })
);

res.json(chatsWithUnread);

    const safeChats = chats.filter(c => c.house !== null);

    res.json(safeChats);
  } catch (err) {
    res.status(500).json({ message: "Failed to load seller chats" });
  }
};


// Get messages for a chat
export const getMessages = async (req, res) => {
  const { chatId } = req.params;
  const userId = req.user.id;

  // Mark all messages in this chat as read for the current user:
  await Message.updateMany(
    { chat: chatId, sender: { $ne: userId } },
    { $set: { isRead: true } }
  );

  const messages = await Message.find({ chat: chatId })
    .populate("sender", "name")
    .sort("createdAt");

  res.json(messages);
};


// Send message (REST fallback, Socket will also use this)
export const sendMessage = async (req, res) => {
  const { chatId, text } = req.body;

  const chat = await Chat.findById(chatId);
  if (!chat) {
    return res.status(404).json({ message: "Chat not found" });
  }

  if (chat.isClosed) {
    return res.status(403).json({ message: "Chat is closed" });
  }

  const message = await Message.create({
    chat: chatId,
    sender: req.user.id,
    text,
  });

  chat.lastMessage = text;
  await chat.save();

  res.json(message);
};

export const getChatMeta = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.chatId)
      .populate({
        path: "house",
        select: "title",
        options: { strictPopulate: false },
      })
      .populate("buyer", "name")
      .populate("seller", "name");

    if (!chat) {
      return res.status(404).json({ message: "Chat not found" });
    }

    // ✅ FIX 5: House deleted → auto close chat safely
    if (!chat.house) {
      return res.json({
        ...chat.toObject(),
        isClosed: true,
      });
    }

    res.json(chat);
  } catch (err) {
    console.error("🔥 getChatMeta error:", err);
    res.status(500).json({ message: "Failed to load chat meta" });
  }
};

export const getUnreadCount = async (req, res) => {
  try {
    const userId = req.user.id;

    // Count unread messages where current user is the recipient
    const count = await Message.countDocuments({
      isRead: false,
      sender: { $ne: userId },
      chat: {
        $in: await Chat.find({
          $or: [{ buyer: userId }, { seller: userId }],
        }).distinct("_id"),
      },
    });

    res.json({ unreadCount: count });
  } catch (err) {
    console.error("Error getting unread count", err);
    res.status(500).json({ message: "Failed to get unread count" });
  }
};
