import React, { useState, useEffect } from 'react';

function Game() {
  const [gameState, setGameState] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/game')
      .then(response => response.json())
      .then(data => setGameState(data))
      .catch(err => {
        console.error(err);
        setError('Failed to load game state.');
      });
  }, []);

  // A function to handle a sample move (taking 1 blue and 1 red token)
  const handleTakeTokens = async () => {
    const moveData = {
      action: "take_tokens",
      tokens: {
        blue: 1,
        red: 1
      }
    };

    try {
      const response = await fetch('http://localhost:5000/game/move', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(moveData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error);
        return;
      }
      const updatedState = await response.json();
      setGameState(updatedState);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Error making move.');
    }
  };

  if (!gameState) {
    return <div>Loading game state...</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Splendor Game</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Points: {gameState.points}</h2>
        <h3>Tokens Available:</h3>
        <ul>
          {Object.entries(gameState.tokens).map(([token, count]) => (
            <li key={token}>
              {token.charAt(0).toUpperCase() + token.slice(1)}: {count}
            </li>
          ))}
        </ul>
      </div>

      {/* Button to simulate taking tokens */}
      <button 
        onClick={handleTakeTokens}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        Take 1 Blue and 1 Red Token
      </button>
    </div>
  );
}

export default Game;