import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Gameboard from './pages/Gameboard'; 
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AuthPage from './pages/AuthPage.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
      <BrowserRouter>
      <AuthProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/gameboard" element={<Gameboard />} />
            <Route path="/user-auth" element={<AuthPage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
