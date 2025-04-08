import React, { useState } from 'react';

import './pageStyles/Home.css'
import PageHeader from "../components/PageHeader";
import NavigationButton from "../components/NavigationButton";
import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
{/* 
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");
*/}

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

  let selectedButton = null;


export default function Home() {

    const [selectedOption, setSelectedOption] = useState(null);
    const {user} = useAuthContext()
    const handleSelect = (option) => {
        setSelectedOption(option);
        console.log('Selected option:', option);
    };
    
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

    
    
    return(
        
        <div>
            <div className="page-header"><PageHeader title='Home' home={false} rules={true} userauth={!user} profile={user}/></div>
            <div className="home-container">
                <div className='option-box'>
                    <h1 className='box-header'>
                        Create Game
                    </h1>
                    <div className='button-row'>
                        <GameChoiceButton
                            title="Public"
                            selected={selectedOption === "Public"}
                            onClick={() => handleSelect("Public")}
                        />
                        <GameChoiceButton
                            title="Private"
                            selected={selectedOption === "Private"}
                            onClick={() => handleSelect("Private")}
                        />
                    </div>
                    <p className='turn-timer'>
                        Turn Timer:
                    </p>
                    <Link to="/Gameboard">
                        <button className='create-button'>
                            Create Game
                        </button>
                    </Link>
                </div>
                <div className='option-box'>
                    <h1 className='box-header'>
                        Join Game
                    </h1>
                    <input className='game-code-input-box'type="number" placeholder="Enter code here"></input>
                    <Link to="/Gameboard">
                        <button className='create-button'>
                            Join Game
                        </button>
                    </Link>
                </div>
            </div>
    </div>        
    )
}