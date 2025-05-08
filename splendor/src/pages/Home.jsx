import { useEffect, useState, useRef } from "react";

import './PageStyles/Home.css'
import PageHeader from "../components/PageHeader";
import { useAuthContext } from '../context/AuthContext';
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { SocketContext } from "../context/SocketContext";
import { db } from "../firebase";
import { ref, get } from "firebase/database";
import socket from '../socket/socket';

export default function Home() {

    const {user} = useAuthContext()

    const usernameRef = useRef("");


    const navigate = useNavigate();
    const socket = useContext(SocketContext)
    const [joinCode, setJoinCode] = useState("");
    

    useEffect(() => {
      if (!socket) return;
        socket.onAny((event, ...args) => {
          console.log(`[SOCKET DEBUG] Event: ${event}`, args);
        });
      
        return () => {
          socket.offAny(); // Clean up when component unmounts
        };
      }, [socket]);

    useEffect(() => {
      if (!socket) return;
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
      }, [socket]);

      useEffect(() => {
        const fetchUsername = async () => {
          if (user && !user.isAnonymous) {
            try {
              const snapshot = await get(ref(db, "users/" + user.uid));
              if (snapshot.exists()) {
                const data = snapshot.val();
                usernameRef.current = data.username || user.displayName || user.email?.split("@")[0];
              }
            } catch (error) {
              console.error("Error fetching username from DB:", error);
            }
          } else {
          
            try {
              const snapshot = await get(ref(db, "users/" + user.uid));
              if (snapshot.exists()) {
                const data = snapshot.val();
                usernameRef.current = data.username || "Guest";
              } else {
                console.warn("No guest username found in database.");
                usernameRef.current = "Guest";
              }
            } catch (error) {
              console.error("Error fetching guest username:", error);
              usernameRef.current = "Guest";
            }
          }
          
          
        };
      
        fetchUsername();
      }, [user]);
    
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
          const code = generateNumericCode(6);
          socket.emit("create_lobby", {
            username: usernameRef.current,
            lobbyCode: code,
            photoURL: user.photoURL || "/images/default_pfp.jpg"
          });
        
          socket.once("lobby_created", (data) => {
            navigate("/lobby", {
              state: {
                lobbyCode: data.lobbyCode,
                username: usernameRef.current,
              },
            });
          });
        };
        

        const handleJoinLobby = () => {
          if (!joinCode || joinCode.length < 4) {
            alert("Please enter a valid lobby code.");
            return;
          }
        
          console.log("Joining lobby with code:", joinCode);
        
          socket.emit("join_lobby", {
            username: usernameRef.current,
            lobbyCode: joinCode,
            photoURL: user.photoURL || "/images/default_pfp.jpg"
          });
        
          socket.once("lobby_joined", (data) => {
            navigate("/lobby", {
              state: {
                lobbyCode: data.lobbyCode,
                username: usernameRef.current,
              },
            });
          });
        
          socket.once("error", (data) => {
            alert(data.message || "Failed to join lobby.");
          });
        };
        
          const generateNumericCode = (length) => {
            return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('');
          };
    
    
    return(
        
        <div>
            <div className="page-header"><PageHeader title='Home' home={false} rules={true} userauth={!user && !user?.isAnonymous} profile={!!user || user?.isAnonymous}/></div>
            <div className="home-container">
            <div className="home-play-box">
              <h1 className="box-header">Play Splendor</h1>

              <button className="create-game-button" onClick={handleCreateLobby}>
                Create Game
              </button>

              <div className="join-section">
                <input
                  className="game-code-input-box"
                  type="text"
                  placeholder="Enter code to join"
                  value={joinCode}
                  onChange={(e) => setJoinCode(e.target.value)}
                />

                <button className="join-game-button" onClick={handleJoinLobby} disabled={joinCode.trim().length < 4}>
                  Join Game
                </button>
              </div>
            </div>
            </div>
    </div>        
    )
}