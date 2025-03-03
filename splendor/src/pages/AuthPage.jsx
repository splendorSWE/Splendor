// src/pages/AuthPage.jsx
import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { ref, set } from "firebase/database";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Sign Up
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
    
        // ✅ Save user info to Realtime Database
        await set(ref(db, "users/" + user.uid), {
          email: user.email,
          createdAt: new Date().toISOString(),
          highScore: 0,
          username: "NewUser"
        });
      }
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
    
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>{isLogin ? "Login" : "Create Account"}</h1>
      <form onSubmit={handleSubmit} style={{ display: "inline-block" }}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: "0.5rem", margin: "0.5rem" }}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ padding: "0.5rem", margin: "0.5rem" }}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" style={{ padding: "0.5rem 1rem", marginTop: "1rem" }}>
          {isLogin ? "Login" : "Sign Up"}
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

      
    </div>
  );
}
