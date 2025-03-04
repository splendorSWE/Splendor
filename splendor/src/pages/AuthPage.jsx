// src/pages/AuthPage.jsx
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInAnonymously} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { ref, set } from "firebase/database";
import { db } from "../firebase";




function SignOutButton() {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
}

function ContinueAsGuestBotton() {
  signInAnonymously(auth)
  .then(() => {

  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

  });
  return (<button>Play As Guest</button>);
}



export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Sign Up
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // handles auth state change.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleGuestSignIn = async () => {
    try {
      await signInAnonymously(auth);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // if set to login, call signin.
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } 
      // if else (sign up), then create user.
      else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const randomNumber = Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
        const userName = "User" + randomNumber
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
      setError(err.message);
    } 
  };

  return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh", // Full height of the screen
          padding: "1rem",
        }}
      >
        <div
          style={{
            padding: "2rem",
            textAlign: "center",
            backgroundColor: "white",
            width: "100%",
            maxWidth: "400px", // Limits the width
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <h1>{isLogin ? "Login" : "Create Account"}</h1>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ padding: "0.5rem", margin: "0.5rem 0" }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ padding: "0.5rem", margin: "0.5rem 0" }}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button
              type="submit"
              style={{
                padding: "0.5rem 1rem",
                marginTop: "1rem",
              }}
            >
              {isLogin ? "Login" : "Create Account"}
            </button>
          </form>
          <p style={{ marginTop: "1rem" }}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              style={{
                background: "none",
                border: "none",
                color: "blue",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              {isLogin ? "Sign up here" : "Login here"}
            </button>
          </p>
          <div style={{ marginTop: "1rem" }}>
          {user && (
              <SignOutButton />
          )}  
            <button style={{margin: 10}} onClick={() => handleGuestSignIn()}>
              Continue As Guest</button>
            </div>
        </div>
      </div>
    );}
 