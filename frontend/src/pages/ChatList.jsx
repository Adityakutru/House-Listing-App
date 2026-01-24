import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function ChatList() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const loadChats = async () => {
    setLoading(true);

    try {
      const [buyerRes, sellerRes] = await Promise.allSettled([
        api.get("/chat/buyer"),
        api.get("/chat/seller"),
      ]);

      let allChats = [];

      if (buyerRes.status === "fulfilled") {
        allChats.push(...buyerRes.value.data);
      }

      if (sellerRes.status === "fulfilled") {
        allChats.push(...sellerRes.value.data);
      }

      const unique = Array.from(
        new Map(allChats.map(c => [c._id, c])).values()
      );

      setChats(unique);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  loadChats();
}, []);



  if (loading) {
    return <p className="text-center mt-10">Loading chats...</p>;
  }

  if (chats.length === 0) {
    return (
      <p className="text-gray-500 text-center mt-20">
        You currently don’t have any open chats.
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-6 space-y-3">
      {chats.map((chat) => {

const buyerId = chat.buyer?._id?.toString();
const sellerId = chat.seller?._id?.toString();

let otherUser = null;

if (buyerId === user.id) {
  otherUser = chat.seller;
} else if (sellerId === user.id) {
  otherUser = chat.buyer;
}


        return (
          <div
            key={chat._id}
            onClick={() => navigate(`/chat/${chat._id}`)}
            className="p-4 bg-white shadow rounded-lg cursor-pointer hover:bg-gray-50"
          >
            <div className="flex items-center gap-2">
  <p className="font-semibold">{otherUser?.name || "User"}</p>
  {chat.unreadCount > 0 && (
    <span className="bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
      {chat.unreadCount}
    </span>
  )}
</div>

            <p className="text-sm text-gray-500">
              {chat.house?.title || "Property removed"}
            </p>
            {chat.lastMessage && (
              <p className="text-sm mt-1 truncate">
                {chat.lastMessage}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
