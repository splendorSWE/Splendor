// socket.js
import { io } from "socket.io-client";

let socket;

if (!socket) {
  socket = io("http://localhost:4000", {
    transports: ["websocket"],
    withCredentials: true,
    autoConnect: true, // optional: connects immediately
  });
}

export default socket;
