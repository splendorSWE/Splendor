import React from 'react';
import "./pageStyles/Profile.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

export default function EditProfile({ initialProfilePic }) {
    const navigate = useNavigate();
    const location = useLocation();
    // const initialProfilePic = location.state?.initialProfilePic || "../images/default_pfp.jpg";
    const [profilePic, setProfilePic] = useState(location.state?.initialProfilePic || "../images/default_pfp.jpg");

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfilePic(imageUrl);
        }
    };

    return (
        <div className="profile-container">
            <PageHeader title='Edit Profile' home = {true} rules = {true}/>
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
                <button className='button' onClick={() => navigate("/profile", { state: { profilePic } })}>
                    Submit
                </button>

            </div>
        </div>
    )
}