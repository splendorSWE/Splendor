import React from 'react';
import "./pageStyles/Profile.css";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NavigationButton from '../components/NavigationButton';
import PageHeader from '../components/PageHeader';
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { ref, get } from "firebase/database";
import { db } from "../firebase";

export default function EditProfile({ initialProfilePic }) {
    const navigate = useNavigate();
    const location = useLocation();
    // const initialProfilePic = location.state?.initialProfilePic || "../images/default_pfp.jpg";
    const [profilePic, setProfilePic] = useState(location.state?.initialProfilePic || "../images/default_pfp.jpg");

    const [userInfo, setUserInfo] = useState(null);
    const [newPassword, updatePassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const user = auth.currentUser;
            if (user) {
                if (user.isAnonymous) {
                    setUserInfo({
                        username: "Guest",
                        createdAt: "N/A",
                        wins: "N/A",
                        isGuest: true,
                    });
                } else {
                    const userId = user.uid;
                    const snapshot = await get(ref(db, "users/" + userId));
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        setUserInfo({
                            username: data.username,
                            createdAt: new Date(data.createdAt).toLocaleDateString(),
                            wins: data.wins,
                        });
                    } else {
                        console.log("No user data found!");
                    }
                }
            } else {
                setUserInfo("No User");
            }
        };

        fetchUserInfo();
    }, []);

    const handlePasswordChange = async () => {
        if (!newPassword) {
            alert("Please enter a new password.");
            return;
        }

        const user = auth.currentUser;
        if (user) {
            try {
                await updatePassword(user, newPassword);
                alert("Password updated successfully!");
            } catch (error) {
                console.error("Error updating password:", error);
                alert(error.message);
            }
        } else {
            alert("No user signed in.");
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setProfilePic(imageUrl);
        }
    };


    if (!userInfo) {
        return <p>Loading your profile...</p>;
    }

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

                {(userInfo !== "No User") ? (
                    <>
                        <p className="info"><strong>Username:</strong> {userInfo.username}</p>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="New Password"
                            className="password-input"
                            value={newPassword}
                            onChange={(e) => updatePassword(e.target.value)}
                        />
                        <button
                                type="button"
                                className="view-password-btn"
                                onClick={() => setShowPassword(!showPassword)}
                            >{showPassword ? "hide" : "show"}</button>
                        <button className="button" onClick={handlePasswordChange}>
                            Update Password
                        </button>
                        <button className='button' onClick={() => navigate("/profile", { state: { profilePic } })}>
                            Submit
                        </button>
                    </>
                ) : (
                    <h2>Not signed in</h2>
                )}

            </div>
        </div>
    )
}