import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { getSocket } from "../socket";
import { FiChevronLeft } from "react-icons/fi";

export default function Chat() {
  const { chatId } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [chat, setChat] = useState(null);

  const bottomRef = useRef(null);

  /* ---------------- CHAT META ---------------- */
  useEffect(() => {
    api
      .get(`/chat/meta/${chatId}`)
      .then(res => setChat(res.data))
      .catch(() => setChat(null));
  }, [chatId]);

  /* ---------------- SOCKET + MESSAGES ---------------- */
  useEffect(() => {
    const socket = getSocket();

    socket.emit("joinChat", chatId);

    api
      .get(`/chat/${chatId}/messages`)
      .then(res => setMessages(res.data))
      .catch(() => setMessages([]));

    socket.on("receiveMessage", msg => {
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [chatId]);

  /* ---------------- AUTO SCROLL ---------------- */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ---------------- SEND MESSAGE ---------------- */
  const sendMessage = async () => {
  if (!text.trim() || chat?.isClosed) return;

  const socket = getSocket();

  // 1️⃣ Save message (REST)
  const res = await api.post("/chat/message", {
    chatId,
    text,
  });

  // 2️⃣ Broadcast message (Socket)
  socket.emit("sendMessage", {
    chatId,
    sender: res.data.sender, // 👈 comes from backend
    text: res.data.text,
  });

  setText("");
};

const formatTime = (date) => {
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};



  return (
    <div className="max-w-4xl mx-auto mt-6 bg-white shadow rounded-lg flex flex-col h-[70vh]">

      {/* CHAT CLOSED BANNER */}
      {chat?.isClosed && (
        <div className="bg-red-100 text-red-600 text-center py-2 font-medium">
          Property is no longer listed. Chat closed.
        </div>
      )}
      {/* CHAT HEADER */}
<div className="border-b p-4 flex items-center justify-between bg-white">

  {/* LEFT: BACK + INFO */}
  <div className="flex items-center gap-3">
    <button
      onClick={() => window.history.back()}
      className="text-blue-600 font-medium hover:underline"
    >
      <FiChevronLeft />
    </button>

    <div>
      <p className="font-semibold text-lg">
        {
          chat &&
          (chat.buyer._id === user.id
            ? chat.seller.name
            : chat.buyer.name)
        }
      </p>

      <p className="text-sm text-gray-500">
        {chat?.house?.title || "Property removed"}
      </p>
    </div>
  </div>

</div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <p className="text-gray-500 text-center mt-10">
            You currently don’t have any messages.
          </p>
        )}

        {messages.map((m, i) => {
          const senderId =
            typeof m.sender === "object" ? m.sender._id : m.sender;

          const isMine = senderId === user.id;

          return (
            <div
  key={i}
  className={`max-w-xs px-4 py-2 rounded-lg ${
    isMine
      ? "bg-blue-600 text-white ml-auto"
      : "bg-gray-200 mr-auto"
  }`}
>
  <p>{m.text}</p>

  <p
    className={`text-xs mt-1 ${
      isMine ? "text-blue-100 text-right" : "text-gray-500"
    }`}
  >
    {formatTime(m.createdAt)}
  </p>
</div>

          );
        })}

        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div className="p-4 border-t flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={chat?.isClosed ? "Chat closed" : "Type a message..."}
          disabled={chat?.isClosed}
          className="flex-1 border rounded px-3 py-2 disabled:bg-gray-200"
        />

        <button
          onClick={sendMessage}
          disabled={chat?.isClosed}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
