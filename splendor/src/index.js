import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Gameboard from './pages/Gameboard'; 
import Login from './pages/AuthPage';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/gameboard" element={<Gameboard />} />
        <Route path="/user-auth" element={<Login />} />
      </Routes>
    </BrowserRouter>
    
  </React.StrictMode>
);


ReactDOM.render(
  
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
