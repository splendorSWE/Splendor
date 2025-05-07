
import { useState, useEffect } from "react";
import { signup, login, logout, loginGuest, useAuth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { ref, set, get } from "firebase/database";
import { db } from "../firebase";
import PageHeader from '../components/PageHeader';
import NavigationButton from "../components/NavigationButton";
import './PageStyles/AuthPage.css';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const user = useAuth();

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
      if (isLogin) {
        await login(email, password);
      } else {
        const userCredential = await signup(email, password);
        const user = userCredential.user;
        const userName = username.trim();

        await set(ref(db, "users/" + user.uid), {
          email: user.email,
          createdAt: new Date().toISOString(),
          wins: 0,
          username: userName
        });
      }
      navigate("/");
    } catch (err) {
      alert(err.message);
      setError(err.message);
    }
  };

  return (
    <>
      <PageHeader title='Sign In/Sign Up' home={true} rules={true} profile={user?.isAnonymous} />
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">Splendor</h1>
          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <input
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="auth-input"
              />
            )}
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="auth-input"
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="auth-input"
            />
            <button type="submit" className="auth-button">
              {isLogin ? "log in" : "create account"}
            </button>
          </form>

          <p className="auth-toggle-text">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button className="auth-toggle-btn" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "sign-up" : "login"}
            </button>
          </p>

          <div className="auth-actions">
            {user && (
              <NavigationButton
                onClick={handleSignOut}
                destination='Sign Out'
                link='/'
                styling='dark-button'
              />
            )}
            {!user && (
              <NavigationButton
                onClick={handleGuestSignIn}
                destination='Continue As Guest'
                link='/'
                styling='dark-button'
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
