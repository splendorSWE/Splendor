import React from 'react';
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import PageHeader from "../components/PageHeader";
import NavigationButton from "../components/NavigationButton";
import UserStats from "../components/UserStats";
import './pageStyles/Home.css'

const socket = io("http://localhost:4000");

export default function Home() {

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
    
    return(
        <div className="Home">
            <div className="page-header"><PageHeader title='Home'/></div>
            
            <div className="content-container">
                
                <div className='option-box'>

                </div>
                <div className='option-box'>
                    
                </div>
                
            </div>
        </div>
    )
}