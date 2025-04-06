import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";

let socket;

export const initializeSocket = () => {
  if (!socket) {
    socket = io(BASE_URL, {
      withCredentials: true,
    });

    console.log("Socket initialized");
  }
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    return initializeSocket();
  }
  return socket;
};
