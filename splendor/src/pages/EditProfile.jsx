import React from 'react';
import "./pageStyles/Profile.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

export default function EditProfile() {
    const navigate = useNavigate();
    const [profilePic, setProfilePic] = useState("../images/default_pfp.jpg");

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfilePic(imageUrl);
        }
    };

    return (
        <div className="profile-container">
            <PageHeader title='Edit Profile'/>
            <div className="profile-card">
                <label htmlFor="profile-pic-input" style={{ cursor: "pointer" }}>
                    <img src={profilePic} alt="Profile" className="profile-pic" />
                </label>
                <input
                    type="file"
                    id="profile-pic-input"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                />

                <h2 className="info">Username</h2>
                <input type="password" placeholder="New Password" className="password-input" />
                <button className='button' onClick={() => navigate("/profile")}>
                    Submit
                </button>

            </div>
        </div>
    )
}