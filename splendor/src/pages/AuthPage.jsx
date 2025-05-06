// src/pages/AuthPage.jsx
import { useState, useEffect } from "react";
import { signup, login, logout, loginGuest, useAuth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { ref, set, get } from "firebase/database";
import { db } from "../firebase";
import PageHeader from '../components/PageHeader';
import NavigationButton from "../components/NavigationButton";









export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Sign Up
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const user = useAuth()
  const [username, setUsername] = useState("");

  useEffect(() => {
    const checkAndNavigate = async () => {
      if (user && user.isAnonymous) {
        const snapshot = await get(ref(db, "users/" + user.uid));
        if (snapshot.exists()) {
          navigate("/");
        }
      }
    };
  
    checkAndNavigate();
  }, [user, navigate]);

  const handleGuestSignIn = async () => {
    try {
      await loginGuest();
      navigate("/");
    } catch (error) {
      alert(error.message);
      setError(error.message);
    }
  };

  

  const handleSignOut = async () => {
    try {
      await logout();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // if set to login, call signin.
      if (isLogin) {
        await login(email, password)
      }
      // if else (sign up), then create user.
      else {
        const userCredential = await signup(email, password);
        const user = userCredential.user;
        const userName = username.trim();

        // ✅ Save user info to Realtime Database
        await set(ref(db, "users/" + user.uid), {
          email: user.email,
          createdAt: new Date().toISOString(),
          wins: 0,
          username: userName
        });
      }
      // navigate to the home page.
      navigate("/");

    } catch (err) {
      alert(err.message);
      setError(err.message);
    }
  };


  return (
    <>
      <PageHeader title='Sign In/Sign Up' home = {true} rules = {true} profile={user?.isAnonymous}/>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          padding: "1rem",
          backgroundSize: "cover", // Ensures your overall page background stays
        }}
      >
        <div
          style={{
            padding: "3rem 2rem",
            textAlign: "center",
            backgroundColor: "#253047", // Dark blue background
            width: "100%",
            maxWidth: "400px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        >
          <h1
            style={{
              fontSize: "3rem",
              marginBottom: "1.5rem",
              color: "#F7D774", // Yellow
              fontFamily: "YourCustomFont, serif", // Swap this with your actual font
            }}
          >
            Splendor
          </h1>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            {!isLogin && (
              <input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{
                  padding: "0.75rem",
                  fontSize: "1rem",
                  borderRadius: "4px",
                  border: "none",
                  backgroundColor: "#E8E8E8",
                  fontFamily: "YourCustomFont, serif",
                }}
              />
            )}

            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                padding: "0.75rem",
                fontSize: "1rem",
                borderRadius: "4px",
                border: "none",
                backgroundColor: "#E8E8E8",
                fontFamily: "YourCustomFont, serif",
              }}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                padding: "0.75rem",
                fontSize: "1rem",
                borderRadius: "4px",
                border: "none",
                backgroundColor: "#E8E8E8",
                fontFamily: "YourCustomFont, serif",
              }}
            />

            <button
              type="submit"
              style={{
                padding: "0.75rem",
                marginTop: "1rem",
                backgroundColor: "#F7D774",
                color: "#253047",
                fontWeight: "bold",
                border: "none",
                borderRadius: "4px",
                fontSize: "1.25rem",
                cursor: "pointer",
                fontFamily: "YourCustomFont, serif",
              }}
            >
              {isLogin ? "log in" : "create account"}
            </button>
          </form>

          <p
            style={{
              marginTop: "1rem",
              color: "#E8E8E8",
              fontFamily: "YourCustomFont, serif",
            }}
          >
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              style={{
                background: "none",
                border: "none",
                color: "#F7D774",
                cursor: "pointer",
                textDecoration: "underline",
                fontSize: "1rem",
                fontFamily: "YourCustomFont, serif",
              }}
            >
              {isLogin ? "sign-up" : "login"}
            </button>
          </p>


          <div>
            {user && <NavigationButton
              onClick={handleSignOut}
              destination='Sign Out'
              link='/'
              styling='dark-button'
            />}
            {!user && <NavigationButton
              onClick={handleGuestSignIn}
              destination='Continue As Guest'
              link='/'
              styling='dark-button'
            />}
          </div>
        </div>
      </div>
    </>
  );
}

