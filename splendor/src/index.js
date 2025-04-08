import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Gameboard from './pages/Gameboard'; 
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AuthPage from './pages/AuthPage.jsx';
import Rules from './pages/Rules.jsx'
import GameContainer from './pages/GameContainer.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>    
      <BrowserRouter>
      <AuthProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/gameboard" element={<Gameboard />} />
            <Route path="/user-auth" element={<AuthPage />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/editprofile" element={<EditProfile />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>   
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
