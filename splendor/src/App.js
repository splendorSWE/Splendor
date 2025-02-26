import Home from "./pages/Home.js"
import firebase from "./firebase.js"
import { Link } from 'react-router-dom';
import "./App.css"
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

// Connect to WebSocket server
const socket = io("http://localhost:4000");

function MyButton() {
  return (
    <Link to="/gameboard">
      <button>
        Go to gameboard
      </button>
    </Link>
  );
}

export default function MyApp() {
  const [messages, setMessages] = useState([]);

  // Listen for messages from the server
  useEffect(() => {
    socket.on("message", (msg) => {
      console.log("Message from server:", msg);
      setMessages((prev) => [...prev, msg]);
    });

    // Clean up listener on component unmount
    return () => socket.off("message");
  }, []);

  return (
    <>
      <div className="App">
        <Home/>
        <div className='first-button'>
          <MyButton/>
        </div>
        <div className="GemCard">
          <img src="/Images/MainCards/Blue 1.0.png" alt="Card" />
        </div>
      </div>
    </>
  );
}
