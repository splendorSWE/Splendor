import React from 'react';
import "./pageStyles/Profile.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditProfile() {
    const navigate = useNavigate();

    return (
        <div className="profile-container">
            <div className="profile-card">
                <img src="../images/default_pfp.jpg" alt="Profile" className="profile-pic" />
                <h2 className="info">Username</h2>
                <input type="password" placeholder="New Password" className="password-input" />
                <button className='button' onClick={() => navigate("/profile")}>
                    Submit
                </button>
                
            </div>
        </div>
    )
}