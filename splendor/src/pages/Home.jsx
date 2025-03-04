import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"; 

export default function Home() {
  return (
    <div className="home-page">
      <header className="home-header">
        <img src="/Images/splendor-logo.png" alt="Splendor Logo" className="logo" />
      </header>
      <main className="home-menu">
        <Link to="/gameboard">
          <button className="menu-button">Gameboard</button>
        </Link>
        <Link to="/rules">
          <button className="menu-button">Rules</button>
        </Link>
        <Link to="/create-game">
          <button className="menu-button">Create Game</button>
        </Link>
        <Link to="/join-game">
          <button className="menu-button">Join Game</button>
        </Link>
        <Link to="/profile">
          <button className="menu-button">Profile</button>
        </Link>
      </main>
    </div>
  );
}
