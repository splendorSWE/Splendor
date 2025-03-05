import Home from "./pages/Home"
import { Link } from 'react-router-dom';
import "./App.css"
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import UserStats from "./components/UserStats";
import PageHeader from "./components/PageHeader";
import NavigationButton from "./components/NavigationButton";

// Connect to WebSocket server
const socket = io("http://localhost:4000");



function Rules() {
  return (
    <Link to='/rules'>
      <button>
        Rules
      </button>
    </Link>
  )
}



export default function MyApp() {
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
    
      <div className="App">
        
        <div className="page-header"><PageHeader title='Home'/></div>
          
        <div className="content-container">
          <div className='nav-buttons vertical'>
            {/* <Home/> */}
            <NavigationButton 
              destination="Gameboard"
              link='/gameboard'/>
            <NavigationButton 
            destination="Rules"
            link='/rules'/>
            
            
          </div>
          <div>
            <button className='dark-button'
            onClick={toggleUserStats}>
              {showUserStats ? "Hide User Stats" : "Show User Stats"}
              {showUserStats && <UserStats />}
            </button>
          </div>
          <div className="GemCard">
            <img src="/Images/MainCards/Blue 1.0.png" alt="Card" />
          </div>
        </div>
      </div>
      
  );
}