import React, { useState, useEffect } from 'react';
import Token from '../../Token';

export default function Select3Tokens({ tokens, setView, handleTakeTokens, handleTokenUpdate }) {
    const [selectedTokens, setSelectedTokens] = useState({});
    const [initialTokens, setInitialTokens] = useState({});
  
    useEffect(() => {
      setInitialTokens({ ...tokens });
    }, []);
  
    const isValidSelection = () => {
      const total = Object.values(selectedTokens).reduce((a, b) => a + b, 0);
      return total === 3;
    };
  
    const handleTokenClick = (color, number) => {
      setSelectedTokens((prev) => {
        const updatedTokens = { ...tokens };
  
        if (prev[color] === 1) {
          updatedTokens[color] += 1;
          handleTokenUpdate(updatedTokens);
  
          const { [color]: _, ...rest } = prev;
          return rest;
        }
  
        if (Object.keys(prev).length >= 3) {
          return prev;
        }
  
        updatedTokens[color] -= 1;
        handleTokenUpdate(updatedTokens);
  
        return { ...prev, [color]: 1 };
      });
    };
  
    const handleBack = () => {
      handleTokenUpdate(initialTokens);
      setView("default");
    };
  
    return (
      <div className="board-tokens-section">
        <button className="select-tokens-button" onClick={handleBack}>
          Back
        </button>
  
        <div className='selection-choice-row'>
          <button
            className="select-tokens-choice-button dimmed-choice"
            onClick={() => setView("select2")}
          >
            Choose 2
          </button>
          <button className="select-tokens-choice-button active-choice" onClick={() => setView("select3")}>
            Choose 3
          </button>
        </div>
  
        {Object.entries(tokens).map(([color, number]) => (
          <Token
            key={color}
            color={color}
            number={number}
            onClick={color === 'wild' ? undefined : () => handleTokenClick(color, number)}
            isSelected={selectedTokens[color] === 1}
            isDisabled={color === 'wild' || (number < 1 && !selectedTokens[color])}
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
  
