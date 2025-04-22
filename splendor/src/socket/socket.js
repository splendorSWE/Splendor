import { io } from "socket.io-client";

// Flask Socket.IO server
const socket = io("http://localhost:4000", {
  transports: ["websocket"],
  withCredentials: true,
});

export default socket;