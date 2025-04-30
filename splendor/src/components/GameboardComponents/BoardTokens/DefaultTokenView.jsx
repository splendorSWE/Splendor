import React, { useState, useEffect } from 'react';
import Token from '../Token';

export default function DefaultTokenView({ tokens, setView }) {
    return (
      <div className="board-tokens-section">
        <button className='select-tokens-button' onClick={() => setView("select")}>
          Select Tokens
        </button>
  
        <div className='selection-choice-row'>
          <button className="select-tokens-choice-button dimmed-choice" disabled>
            Choose 2
          </button>
          <button className="select-tokens-choice-button dimmed-choice" disabled>
            Choose 3
          </button>
        </div>
  
        {Object.entries(tokens).map(([color, number]) => (
          <Token key={color} color={color} number={number} />
        ))}
  
        <button className='confirm-tokens-button' style={{ visibility: 'hidden' }}>
          Confirm
        </button>
      </div>
    );
  }
  
  
  
  
  
  