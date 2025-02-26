import React from 'react';
import { Link } from 'react-router-dom';


function HomeButton() {
  return (
    <Link to="/">
      <button style={{ margin: '5px'}}>
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

function Header() {
  return(
    <div style={{
      position: 'fixed',
      width: '100%',
      height: '30px',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end', 
      backgroundColor: 'gold',
    }}>
    <HomeButton  />
    </div>
  )
}

function PlayerCollection() {
  return (
    <div style={{
      position: 'aboslute',
      left: '20px',
      top: 'calc(50vh + 15px)', // Centered while accounting for 30px header
      transform: 'translateY(-50%)',
      width: '20vw',
      height: 'calc(90vh - 30px)',
      backgroundColor: '#f0f0f0',
      boxShadow: '2px 0 5px rgba(0,0,0,0.2)',
      display: 'flex',
      flexDirection: 'column',        // Align elements in a column
      alignItems: 'center',       // Align elements to the left horizontally
      justifyContent: 'flex-start',   // Align items to the top of the box vertically
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',          // Place points and label side by side
        alignItems: 'center',           // Vertically center them in this row
        fontSize: '1.5vw',
        fontFamily: 'Fondamento, sans-serif',
              }}>
        
        <h2 style= {{marginRight: '1vw'}}>
          <PlayerPoints /> 
        </h2>
        <h2>
          Points
        </h2>
      </div>
    </div>
  );
}

export default function Gameboard() {
  return(
    <div>
      <Header />
      <div>
        <PlayerCollection />
        play the game here
        <HomeButton />
      </div>
    </div>
  );
}

