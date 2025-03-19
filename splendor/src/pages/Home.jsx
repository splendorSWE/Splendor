import React from 'react';
import { useEffect, useState } from "react";
import UserStats from "./../components/UserStats";
import PageHeader from "./../components/PageHeader";
import NavigationButton from "./../components/NavigationButton";


export default function Home() {
    const [messages, setMessages] = useState([]);
    const [showUserStats, setShowUserStats] = useState(false);
    const [profilePic, setProfilePic] = useState("../images/default_pfp.jpg")
    const toggleUserStats = () => {
        setShowUserStats((prev) => !prev);
    };

    return(
        <div>
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
                link='/profile'
                state={{ profilePic}}/>
                
                
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
    )
}