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

export default function Profile() {
    const navigate = useNavigate();
    const location = useLocation();
    const profilePic = location.state?.profilePic || "/images/default_pfp.jpg";

    const [userInfo, setUserInfo] = useState(null);

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



    if (!userInfo) {
        return <p>Loading your profile...</p>;
    }

    return (
        <div className="profile-container">
            <PageHeader title='Profile' />
            <div className="profile-card">
                <img src={profilePic} className="profile-pic" />
                {(userInfo !== "No User") ? (
                    <>
                        <p className="info"><strong>Username:</strong> {userInfo.username}</p>
                        <p className="info"><strong>Account Created:</strong> {userInfo.createdAt}</p>
                        <p className="info"><strong>Wins:</strong> {userInfo.wins}</p>
                        <button className="button" onClick={() => navigate("/editprofile", { state: { profilePic } })}>Edit</button >
                    </>
                ) : (
                    <h2>Not signed in</h2>
                )}
            </div>
        </div >

    )
}