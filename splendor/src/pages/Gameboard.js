import React from 'react';
import { Link } from 'react-router-dom';

function HomeButton() {
  return (
    <Link to="/">
      <button>
        Home
      </button>
    </Link>
  );
}

function PlayerPoints() {
  return (
    <h2>
      10
    </h2>
  );
}

function PlayerCollection() {
  return (
    <div style={{
      position: 'fixed',
      left: '20px',
      top: '55%',
      transform: 'translateY(-50%)',
      width: '15vw',
      height: '80vh',
      backgroundColor: '#f0f0f0',
      padding: '20px',
      boxShadow: '2px 0 5px rgba(0,0,0,0.2)',
      fontSize: '24px',
      fontFamily: 'Fondamento, sans-serif',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',        // Align elements in a column
      alignItems: 'center',       // Align elements to the left horizontally
      justifyContent: 'flex-start',   // Align items to the top of the box vertically
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',          // Place points and label side by side
        alignItems: 'center',           // Vertically center them in this row
        justifyContent: 'center',
              }}>
        <PlayerPoints />
        <h2 style={{
          marginLeft: '10px',           // Space between points and label
          fontSize: '3vw',              // Font size scales with viewport width
        }}>
          Points
        </h2>
      </div>
    </div>
  );
}

export default function Gameboard() {
  return(
    <div>
      <PlayerCollection />
      play the game here
      <HomeButton />
    </div>
  );
}
