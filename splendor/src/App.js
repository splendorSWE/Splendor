import Home from "./pages/Home.js"
import firebase from "./firebase.js"
import { Link } from 'react-router-dom';
import "./App.css"
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthProvider } from "./context/AuthContext";
import UserStats from "./components/UserStats";



function MyButton() {
    return (
      <Link to="/gameboard">
        <button>
          I'm a button
        </button>
      </Link>
    );
  }
  
  export default function MyApp() {
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


  return (
    <Link to="/gameboard">
      <button>
        Go to gameboard
      </button>
    </Link>
  );


function UserAuthButton() {
  return (
    <Link to="/user-auth">
      <button>
        Go to Login/SignUp
      </button>
    </Link>
  )
}

export function MyAppContent() {
  const [messages, setMessages] = useState([]);
  const [showUserStats, setShowUserStats] = useState(false);
  // Listen for messages from the server
  useEffect(() => {
    socket.on("message", (msg) => {
      console.log("Message from server:", msg);
      setMessages((prev) => [...prev, msg]);
    });

    // Clean up listener on component unmount
    return () => socket.off("message");
  }, []);

  const toggleUserStats = () => {
    setShowUserStats((prev) => !prev);
  };
  return (
    <>
      <div className="App">
        <Home/>
        <div className='first-button'>
          <MyButton/>
        </div>
        <div className='first-button'>
          <UserAuthButton />
        </div>
        <button onClick={toggleUserStats} style={{ padding: "0.5rem 1rem", marginTop: "1rem" }}>
          {showUserStats ? "Hide User Stats" : "Show User Stats"}
        </button>
        {showUserStats && <UserStats />}
        <div className="GemCard">
          <img src="/Images/MainCards/Blue 1.0.png" alt="Card" />
        </div>
        
      </div>
    </>
  );
}


export default function MyApp() {
  return (
    <AuthProvider>
      <MyAppContent />
    </AuthProvider>
);
}

