import { io } from "socket.io-client";

let socket;

export const initSocket = () => {
  socket = io("http://localhost:3000");
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    socket = initSocket();
  }
  return socket;
};
