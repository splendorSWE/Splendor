import React, { useState } from 'react';
import Token from './Token';

export default function Select2Tokens({ tokens, setView, handleTakeTokens, handleTokenUpdate }) {
  const [selectedTokens, setSelectedTokens] = useState({});

  const isValidSelection = () => {
    const values = Object.values(selectedTokens);
    const total = values.reduce((a, b) => a + b, 0);
    return total === 2 && values.some(val => val === 2);
  };

  const handleTokenClick = (color, number) => {
    setSelectedTokens((prev) => {
      const updatedTokens = { ...tokens };
      const previouslySelectedColor = Object.keys(prev)[0];

      if (previouslySelectedColor === color) {
        updatedTokens[color] += 2;
        handleTokenUpdate(updatedTokens);
        return {};
      }

      if (previouslySelectedColor) {
        updatedTokens[previouslySelectedColor] += 2;
      }

      updatedTokens[color] -= 2;
      handleTokenUpdate(updatedTokens);
      return { [color]: 2 };
    });
  };

  return (
    <div className="board-tokens-section">
      <button className="select-tokens-button" onClick={() => setView("default")}>
        Back
      </button>

      <div className="selection-choice-row">
        <button className="select-tokens-choice-button active-choice" onClick={() => setView("select2")}>
          Choose 2
        </button>
        <button
          className="select-tokens-choice-button dimmed-choice"
          onClick={() => {
            handleTakeTokens(selectedTokens);
            setView("select3");
          }}
        >
          Choose 3
        </button>
      </div>

      {Object.entries(tokens).map(([color, number]) => (
        <Token
          key={color}
          color={color}
          number={number}
          onClick={() => handleTokenClick(color, number)}
          isSelected={selectedTokens[color] === 2}
          isDisabled={number < 4 && !selectedTokens[color]}
        />
      ))}

      <button
        className="confirm-tokens-button"
        onClick={() => {
          handleTakeTokens(selectedTokens);
          setView("default");
        }}
        disabled={!isValidSelection()}
      >
        Confirm
      </button>
    </div>
  );
}


// function Select2Tokens({ tokens, setView, handleTakeTokens, handleTokenUpdate }) {
//     const [selectedTokens, setSelectedTokens] = useState({});
  
//     const isValidSelection = () => {
//       const values = Object.values(selectedTokens);
//       const total = values.reduce((a, b) => a + b, 0);
//       return total === 2 && values.some(val => val === 2);
//     };
  
//     const handleTokenClick = (color, number) => {
//       setSelectedTokens((prev) => {
//         const updatedTokens = { ...tokens };
//         const previouslySelectedColor = Object.keys(prev)[0];
    
//         // If clicking the same token again, unselect it
//         if (previouslySelectedColor === color) {
//           updatedTokens[color] += 2; // Restore 2 tokens
//           handleTokenUpdate(updatedTokens);
//           return {}; // Clear selection
//         }
    
//         // Switching to a new token
//         if (previouslySelectedColor) {
//           updatedTokens[previouslySelectedColor] += 2; // Restore old selection
//         }
    
//         updatedTokens[color] -= 2; // Subtract from new selection
//         handleTokenUpdate(updatedTokens);
//         return { [color]: 2 };
//       });
//     };
  
//     return (
//       <div className="board-tokens-section">
//         <button className='select-tokens-button' onClick={() => setView("default")}>
//           Back
//         </button>
  
//         <div className='selection-choice-row'>
//           <button className="select-tokens-choice-button active-choice" onClick={() => setView("select2")}>
//             Choose 2
//           </button>
//           <button
//             className="select-tokens-choice-button dimmed-choice"
//             onClick={() => {
//               handleTakeTokens(selectedTokens)
//               setView("select3");
//             }}
//           >
//             Choose 3
//           </button>
//         </div>
  
//         {Object.entries(tokens).map(([color, number]) => (
//           <Token
//             key={color}
//             color={color}
//             number={number}
//             onClick={() => handleTokenClick(color, number)} 
//             isSelected={selectedTokens[color] === 2}  
//             isDisabled={number < 4 && !selectedTokens[color]}/>
//         ))}
  
//         <button 
//           className='confirm-tokens-button' 
//           onClick={() => {
//             handleTakeTokens(selectedTokens);
//             setView("default");
//           }} 
//           disabled={!isValidSelection()}
//         >
//           Confirm
//         </button>
//       </div>
//     );
//   }
  