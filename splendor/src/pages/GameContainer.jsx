// import React, { useState, useEffect } from 'react';
// import Gameboard from './Gameboard'; 

// function GameContainer() {


//   useEffect(() => {
//     fetch('http://localhost:5000/game')
//       .then(response => response.json())
//       .then(data => setGameState(data))
//       .catch(err => {
//         console.error(err);
//         setError('Failed to load game state.');
//       });
//   }, []);

  

//   return (
//     <div>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <Gameboard 
//         gameState={gameState} 
//       />
//     </div>
//   );
// }

// export default GameContainer;
