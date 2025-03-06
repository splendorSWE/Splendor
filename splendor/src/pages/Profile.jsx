import React from 'react';
import "./pageStyles/Profile.css";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationButton from '../components/NavigationButton';

export default function Profile() {
    const navigate = useNavigate();

    return (
        <div className="profile-container">
            <div className="profile-card">
                <img src="../images/default_pfp.jpg" className="profile-pic" />
                <h2 className="info">Username</h2>
                <h2 className="info">Email</h2>
                <h2 className="info">Password</h2>
                <button className="button" onClick={() => navigate("/editprofile")}>Edit</button >
            </div>
            <NavigationButton styling='home' destination="Home" link="/" />
        </div >

    )
}