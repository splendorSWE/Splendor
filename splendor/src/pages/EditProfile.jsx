import React from 'react';
import "./PageStyles/EditProfile.css";
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { useEffect, useState } from "react";
import { db, uploadPfP } from "../firebase";
import { ref, get, update } from "firebase/database";
import { updatePassword, emailAuthProvider } from "../firebase";
import { useAuthContext} from '../context/AuthContext';

export default function EditProfile() {
    const navigate = useNavigate();
    const location = useLocation();
    const [profilePic, setProfilePic] = useState(location.state?.profilePic || "/images/default_pfp.jpg");
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [newPassword, setNewPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");
    const [passwordSuccess, setPasswordSuccess] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [showUsernameForm, setShowUsernameForm] = useState(false);
    const [newUsername, setNewUsername] = useState("");
    const { user } = useAuthContext();

    useEffect(() => {
      const fetchUserInfo = async () => {
          if (!user) {
            setUserInfo("No User");
            return;
          }
        
        const userId = user.uid;
          try {
            const snapshot = await get(ref(db, "users/" + userId));
        
            if (snapshot.exists()) {
              const data = snapshot.val();
              setUserInfo({
                username: data.username || (user.isAnonymous ? "Guest" : user.email?.split("@")[0]),
                createdAt: data.createdAt ? new Date(data.createdAt).toLocaleDateString() : "N/A",
                wins: data.wins ?? "N/A",
                isGuest: user.isAnonymous,
              });
            } else {
              console.warn("No user data found!");
              setUserInfo({
                username: user.isAnonymous ? `Guest-${userId.slice(-4)}` : user.email?.split("@")[0],
                createdAt: "N/A",
                wins: "N/A",
                isGuest: user.isAnonymous,
              });
            }
          } catch (err) {
            console.error("Error fetching user info:", err);
            setUserInfo("No User");
          }
        };
        
      fetchUserInfo();
    }, [user, loading]);

    useEffect(() => {
        if (user?.photoURL) {
            setProfilePic(user.photoURL);
        }
    }, [user])

    async function handleUpdatePassword() {
        setPasswordError("");
        setPasswordSuccess(false);
      
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
          const credential = emailAuthProvider(user.email, currentPassword);
        
          await updatePassword(user, credential, newPassword);
          alert("Password Updated Successfully")
          setPasswordSuccess(true); 
          setNewPassword("");
          setCurrentPassword("");
        }  catch (error) {
          console.error("Error updating password:", error);
      
          if (
          error.code === "auth/wrong-password" ||
          error.code === "auth/invalid-credential"
          ) {
          setPasswordError("The current password you entered is incorrect.");
          } else if (error.code === "auth/requires-recent-login") {
          setPasswordError("Session expired. Please sign in again.");
          } else {
          setPasswordError(error.message);
          }
          alert(passwordError); 
          setPasswordSuccess(false);
      }
    }

    if (!userInfo) {
      return <p>Loading your profile...</p>;
    }

    function handleProfilePicChange(e) {
        if (e.target.files[0]) {
            setPhoto(e.target.files[0])
            setProfilePic(e.target.files[0])
        }
    }
    function handleProfilePicClick() {
        uploadPfP(photo, user, setLoading);
    }

    return (
      <div className="profile-container">
          <PageHeader title='Edit Profile' home={true} rules={true}/>
          <div className="profile-card">
          <label htmlFor="profile-pic-input" style={{ cursor: user?.isAnonymous ? "default" : "pointer" }}>
              <img src={profilePic} alt="Profile" className="profile-pic" />
          </label>
          {!user?.isAnonymous && (
          <>
              <input
              type="file"
              id="profile-pic-input"
              accept="image/*"
              className='profile-pic-input'
              onChange={handleProfilePicChange}
              />
              <button className="view-password-btn" disabled={loading || !photo} onClick={handleProfilePicClick}>
              Upload Profile Pic
              </button>
          </>
          )}

          {(userInfo !== "No User") ? (
              <>
                  <p className="info"><strong>Username:</strong> {userInfo.username}</p>
                  {!user?.isAnonymous && (
                  <>
                    <button
                      className="button"
                      onClick={() => setShowUsernameForm((prev) => !prev)}
                    >
                      {showUsernameForm ? "Cancel Username Change" : "Change Username"}
                    </button>

                    {showUsernameForm && (
                      <div className="password-update-section">
                        <input
                          type="text"
                          placeholder="New Username"
                          className="password-input"
                          value={newUsername}
                          onChange={(e) => setNewUsername(e.target.value)}
                        />
                        <button
                          className="button"
                          onClick={async () => {
                            if (!newUsername.trim()) return;
                            try {
                              await update(ref(db, "users/" + user.uid), { username: newUsername.trim() });
                              setUserInfo((prev) => ({ ...prev, username: newUsername.trim() }));
                              setNewUsername("");
                              setShowUsernameForm(false);
                              alert("Username updated!");
                            } catch (err) {
                              console.error("Error updating username:", err);
                              alert("Failed to update username.");
                            }
                          }}
                          disabled={!newUsername.trim()}
                        >
                          Update Username
                        </button>
                      </div>
                    )}
                  </>
                )}

                {!user?.isAnonymous && (
                  <>
                    <button
                      className="button"
                      onClick={() => setShowPasswordForm((prev) => !prev)}
                    >
                      {showPasswordForm ? "Cancel Password Change" : "Change Password"}
                    </button>

                    {showPasswordForm && (
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
                          {showPassword ? "Hide Password" : "Show Password"}
                        </button>

                        <button
                          className="button"
                          onClick={handleUpdatePassword}
                          disabled={!currentPassword || newPassword.length < 6}
                        >
                          Update Password
                        </button>
                      </div>
                    )}
                  </>
                )}
            

                        
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