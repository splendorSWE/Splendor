import { useEffect, useState } from "react";

import './pageStyles/Home.css'
import PageHeader from "../components/PageHeader";
import { useAuthContext } from '../context/AuthContext';
import socket from '../socket/socket';
import { useNavigate } from 'react-router-dom';
 


// import { io } from "socket.io-client";

// const socket = io("http://localhost:4000");

function GameChoiceButton({ title, selected, onClick }) {
    return (
      <button
        className={`game-choice-button ${selected ? "selected" : ""}`}
        onClick={onClick}
      >
        {title}
      </button>
    );
  }


export default function Home() {

    const [selectedOption, setSelectedOption] = useState(null);
    const {user} = useAuthContext()
    const username =
  user && !user.isAnonymous
    ? user.username || user.displayName || user.email?.split("@")[0]
    : `Guest-${Math.floor(Math.random() * 1000)}`;

    const navigate = useNavigate();
    const [joinCode, setJoinCode] = useState("");
    const handleSelect = (option) => {
        setSelectedOption(option);
        console.log('Selected option:', option);
    };

    useEffect(() => {
        socket.onAny((event, ...args) => {
          console.log(`[SOCKET DEBUG] Event: ${event}`, args);
        });
      
        return () => {
          socket.offAny(); // Clean up when component unmounts
        };
      }, []);

    useEffect(() => {
        socket.on("lobby_joined", (data) => {
          console.log("✅ Joined lobby:", data.lobbyCode);
          navigate("/lobby", { state: { lobbyCode: data.lobbyCode } });
        });
      
        socket.on("error", (data) => {
          console.error("Socket error:", data.message);
          alert(data.message || "Join failed.");
        });
      
        return () => {
          socket.off("lobby_joined");
          socket.off("error");
        };
      }, []);
    
    {
        /* 
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
      const [messages, setMessages] = useState([]);
        const [showUserStats, setShowUserStats] = useState(false);
        const [profilePic, setProfilePic] = useState("../images/default_pfp.jpg")

        */}

        

        const handleCreateLobby = () => {
            if (!selectedOption) return;
        
            const isPrivate = selectedOption === "Private";
           

            const code = isPrivate ? generateNumericCode(6) : undefined;
            console.log("Creating lobby with:", selectedOption);
            socket.emit("create_lobby", {
              username,
              type: selectedOption,
              lobbyCode: code,
            });
        
            socket.once("lobby_created", (data) => {
              const lobbyCode = data.lobbyCode;
              navigate("/lobby", { state: { lobbyCode } });
            });
          };
        

          const handleJoinLobby = () => {

          
            if (!joinCode || joinCode.length < 4) {
              alert("Please enter a valid lobby code.");
              return;
            }
          
            console.log("Joining lobby with code:", joinCode);
          
            socket.emit("join_lobby", {
              username,
              lobbyCode: joinCode,
            });

            socket.once("lobby_joined", (data) => {
                const lobbyCode = data.lobbyCode;
                navigate("/lobby", { state: { lobbyCode } });
              });
          };
        
          const generateNumericCode = (length) => {
            return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
          };
    
    
    return(
        
        <div>
            <div className="page-header"><PageHeader title='Home' home={false} rules={true} userauth={!user && !user?.isAnonymous} profile={!!user || user?.isAnonymous}/></div>
            <div className="home-container">
                <div className='option-box'>
                    <h1 className='box-header'>
                        Create Game
                    </h1>
                    <div className='button-row'>
                    {/* <GameChoiceButton title="Public" selected={selectedOption === "Public"} onClick={() => handleSelect("Public")} /> */}
                    <GameChoiceButton title="Private" selected={selectedOption === "Private"} onClick={() => handleSelect("Private")} />
                    </div>
                    <p className='turn-timer'>
                        Turn Timer:
                    </p>
                    <button className='create-button' onClick={handleCreateLobby}>
                        Create Game
                    </button>

                </div>
                <div className='option-box'>
                    <h1 className='box-header'>Join Game</h1>
                    <input
                        className='game-code-input-box'
                        type="text"
                        placeholder="Enter code here"
                        value={joinCode}
                        onChange={(e) => setJoinCode(e.target.value)}
                    />
                    <button className='create-button' onClick={handleJoinLobby}>
                        Join Game
                    </button>
                </div>
            </div>
    </div>        
    )
}