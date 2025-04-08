import React from 'react';
import "./pageStyles/Profile.css";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import NavigationButton from '../components/NavigationButton';
import PageHeader from '../components/PageHeader';
import { useEffect, useState } from "react";
import { useAuth, db, upload, auth} from "../firebase";
import { ref, get } from "firebase/database";
import { useAuthContext} from '../context/AuthContext';
import { logout } from '../firebase';



export default function Profile() {
    const navigate = useNavigate();
    const location = useLocation();
    const [profilePic, setProfilePic] = useState(location.state?.profilePic || "/images/default_pfp.jpg");
    const [photo, setPhoto] = useState(null);
    // const [loading, setLoading] = useState(false);
    //const user = useAuth()
    const { user, loading } = useAuthContext();

    const [userInfo, setUserInfo] = useState(null);
    // const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        const fetchUserInfo = async () => {
            
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
                        const profilePicURL = data.profilePic || user.photoURL || "/images/default_pfp.jpg";
                    setProfilePic(profilePicURL);
                    } else {
                        console.log("No user data found!");
                    }
                }
            } else {
                setUserInfo("No User");
            }
        };
        if (!loading && user) {
            fetchUserInfo();
        }
    }, [user, loading]);

    

    if (!userInfo) {
        return <PageHeader title='Profile' home={true} rules={true} profile={false}/>
    }

    return (
        <div className="profile-container">
            <PageHeader title='Profile' home={true} rules={true} profile={false}/>
            <div className="profile-card">
                <img src={profilePic} className="profile-pic" />
                {(userInfo !== "No User") ? (
                    <>
                        <p className="info"><strong>Username:</strong> {userInfo.username}</p>
                        <p className="info"><strong>Account Created:</strong> {userInfo.createdAt}</p>
                        <p className="info"><strong>Wins:</strong> {userInfo.wins}</p>
                        <button className="button" onClick={() => navigate("/editprofile", { state: { profilePic } })}>Edit</button >
                        <NavigationButton destination="Sign Out" link="/user-auth" styling='button' onClick={logout}/>
                    </>
                ) : (
                    <h2 className="info">Not signed in</h2>
                )}
            </div>
        </div >

    )
}