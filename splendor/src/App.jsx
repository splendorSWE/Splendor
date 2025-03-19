import Home from "./pages/Home"

import "./App.css"
import { useEffect, useState } from "react";
import { io } from "socket.io-client";


// Connect to WebSocket server
// const socket = io("http://localhost:4000");






export default function MyApp() {

  // // Listen for messages from the server
  // useEffect(() => {
  //   socket.on("message", (msg) => {
  //     console.log("Message from server:", msg);
  //     setMessages((prev) => [...prev, msg]);
  //   });

  
  //   // Clean up listener on component unmount
  //   return () => socket.off("message");
  // }, []);

  
  return (
    
      <div className="App">
        <Home/>
      </div>
      
  );

}

