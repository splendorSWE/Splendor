import React from 'react';
import "./Profile.css";
import { Link } from 'react-router-dom';
import { useState } from 'react';


function HomeButton() {
    return (
        <Link to="/" style={{ textDecoration: "none" }}>
            <button className='home-button'>
                Home
            </button>
        </Link>
    );
}

export default function Profile() {
    return (
        <div>
            <div className="profile-container">
                <div>
                    <div className="profile-card">
                        <img src="../images/default_pfp.jpg" alt="Profile" className="profile-pic" />
                        <h2 className="username-show">Username</h2>
                        <input type="password" placeholder="New Password" className="password-input" />
                    </div>
                </div>
                <HomeButton />
            </div >
        </div>

    )
}