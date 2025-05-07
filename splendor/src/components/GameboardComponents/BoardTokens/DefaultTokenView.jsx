import React, { useState, useEffect } from 'react';
import Token from '../Token';
import '../../ComponentStyles/BoardTokens.css';

export default function DefaultTokenView({ tokens, setView, tokenOrder, isTurn }) {
  return (
    <div className="board-tokens-section">
      <button className='select-tokens-button' disabled={!isTurn} onClick={() => setView("select")}>
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

      {tokens && tokenOrder
        .map(color => (
          <Token key={color} color={color} number={tokens[color]} />
        ))}

      <button className='confirm-tokens-button' style={{ visibility: 'hidden' }}>
        Confirm
      </button>
    </div>
  );
}





