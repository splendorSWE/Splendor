import React from 'react';
import "./pageStyles/Profile.css";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NavigationButton from '../components/NavigationButton';
import PageHeader from '../components/PageHeader';

export default function Profile() {
    const navigate = useNavigate();
    const location = useLocation();
    const profilePic = location.state?.profilePic || "/images/default_pfp.jpg";

    return (
        <div className="profile-container">
            <PageHeader title='Profile' home={true} rules={true}/>
            <div className="profile-card">
                <img src={profilePic} className="profile-pic" />
                <h2 className="info">Username</h2>
                <h2 className="info">Email</h2>
                <h2 className="info">Password</h2>
                <button className="button" onClick={() => navigate("/editprofile", { state: { profilePic } })}>Edit</button >
            </div>
        </div >

    )
}