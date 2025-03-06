import Home from "./pages/Home"

import "./App.css"
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import UserStats from "./components/UserStats";
import PageHeader from "./components/PageHeader";
import NavigationButton from "./components/NavigationButton";

// Connect to WebSocket server
const socket = io("http://localhost:4000");






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
        <Home/>
        
        <div className="page-header"><PageHeader title='Home'/></div>
          
        <div className="content-container">
          <div>
            {/* <Home/> */}
            <NavigationButton styling='dark-button vertical'
              destination="Gameboard"
              link='/gameboard'/>
            <NavigationButton 
            styling='dark-button vertical'
            destination="Rules"
            link='/rules'/>
            <NavigationButton 
            styling='dark-button vertical'
            destination="User Profile"
            link='/profile'/>
            
            
          </div>
          <div>
            <button className='dark-button'
            onClick={toggleUserStats}>
              {showUserStats ? "Hide User Stats" : "Show User Stats"}
              {showUserStats && <UserStats />}
            </button>
          </div>

        </div>
      </div>
      
  );

}

