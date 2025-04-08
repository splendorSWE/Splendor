import React from 'react';
import './pageStyles/Home.css'
import PageHeader from "../components/PageHeader";
import NavigationButton from "../components/NavigationButton";
import { Link } from 'react-router-dom';
{/* 
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import UserStats from "../components/UserStats";

const socket = io("http://localhost:4000");
*/}

function GameChoiceButton({title}) {
    return(
      <button class='game-choice-button' title={title}>
          {title}
      </button>
    )
  }

  const buttons = document.querySelectorAll('.game-choice-button');
  let selectedButton = null;

  buttons.forEach(button => {
      button.addEventListener('click', () => {
          if (selectedButton) {
              selectedButton.classList.remove('selected');
          }
          button.classList.add('selected');
          selectedButton = button;
          // Do something with the selected value
          console.log('Selected value:', button.dataset.value);
      });
  });

export default function Home() {

    {/* 
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
            <div className="page-header"><PageHeader title='Home'/></div>
            
            <div className="home-container">
                <div className='option-box'>
                    <h1 className='box-header'>
                        Create Game
                    </h1>
                    <div className='button-row'>
                        <GameChoiceButton title={"Public"}/>
                        <GameChoiceButton title={"Private"}/>
                    </div>
                    <p className='turn-timer'>
                        Turn Timer:
                    </p>
                    <Link to="/Gameboard">
                        <button class='create-button'>
                            Create Game
                        </button>
                        </Link>
                </div>
                <div className='option-box'>
                    <h1 className='box-header'>
                        Join Game
                    </h1>
                    <input class='game-code-input-box'type="number" placeholder="Enter code here"></input>
                    <Link to="/Gameboard">
                        <button class='create-button'>
                            Join Game
                        </button>
                    </Link>
                </div>
            </div>
            
        </div>
    )
}