import React from 'react';
import '../componentStyles/Token.css';

export default function Token({ color, number, onClick, isSelected, isDisabled }) {
  return (
    <div
      className={`token-div ${isDisabled ? 'disabled' : ''}`}
      onClick={isDisabled ? undefined : onClick}
    >
      {isSelected && <div className="token-highlight" />}
      <img
        src={`/Images/Tokens/${color} Token.png`}
        alt={`${color} Token`}
        className="token-img"
      />
      <span className="token-span">
        {number}
      </span>
    </div>
  );
}
