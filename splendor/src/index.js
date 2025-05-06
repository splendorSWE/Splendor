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
import LobbyRoom from './pages/LobbyRoom.jsx';
import { SocketProvider } from './context/SocketContext';
import { useAuthContext } from './context/AuthContext';
import { Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>    
      <BrowserRouter>
      <AuthProvider>
      <SocketProvider>
          <Routes>
          
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <App />
                </ProtectedRoute>
              }
            />
            <Route path="/user-auth" element={<AuthPage />} />
            <Route
              path="/gameboard"
              element={
                <ProtectedRoute>
                  <Gameboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/editprofile"
              element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/lobby"
              element={
                <ProtectedRoute>
                  <LobbyRoom />
                </ProtectedRoute>
              }
            />
            <Route path="/rules" element={<Rules />} />
          </Routes>
          </SocketProvider>
        </AuthProvider>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
