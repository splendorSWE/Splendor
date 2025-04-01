import React from 'react';
import "./pageStyles/Profile.css";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NavigationButton from '../components/NavigationButton';
import PageHeader from '../components/PageHeader';
import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { ref, get, update } from "firebase/database";
import { db } from "../firebase";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { updatePassword as firebaseUpdatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

export default function EditProfile({ initialProfilePic }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [profilePic, setProfilePic] = useState(location.state?.initialProfilePic || "../images/default_pfp.jpg");
    const [userInfo, setUserInfo] = useState(null);
    const [newPassword, setNewPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [passwordSuccess, setPasswordSuccess] = useState(false);

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

    async function handleUpdatePassword() {
        setPasswordError("");
        setPasswordSuccess(false);
        
        const user = auth.currentUser;
        
        if (!user || !user.email) {
            setPasswordError("No user signed in.");
            return;
        }

        if (!currentPassword) {
            setPasswordError("Please enter your current password.");
            return;
        }

        if (!newPassword || newPassword.length < 6) {
            setPasswordError("Password must be at least 6 characters long.");
            return;
        }

        try {
            // Create credential with current password
            const credential = EmailAuthProvider.credential(
                user.email, 
                currentPassword
            );
            
            // Reauthenticate user
            await reauthenticateWithCredential(user, credential);
            
            // Now update password
            await firebaseUpdatePassword(user, newPassword);
            
            setPasswordSuccess(true);
            setNewPassword("");
            setCurrentPassword("");
        } catch (error) {
            console.error("Error updating password:", error);
            if (error.code === "auth/wrong-password") {
                setPasswordError("The current password you entered is incorrect.");
            } else if (error.code === "auth/requires-recent-login") {
                setPasswordError("Session expired. Please sign in again.");
            } else {
                setPasswordError(error.message);
            }
        }
    }

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
            <PageHeader title='Edit Profile' home={true} rules={true}/>
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
                        
                        <div className="password-update-section">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Current Password"
                                className="password-input"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="New Password"
                                className="password-input"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="view-password-btn"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                            
                            {passwordError && <p className="error-message">{passwordError}</p>}
                            {passwordSuccess && <p className="success-message">Password updated successfully!</p>}
                            
                            <button className="button" onClick={handleUpdatePassword}>
                                Update Password
                            </button>
                        </div>
                        
                        <button className='button' onClick={() => navigate("/profile", { state: { profilePic } })}>
                            Back to Profile
                        </button>
                    </>
                ) : (
                    <h2>Not signed in</h2>
                )}
            </div>
        </div>
    )
}