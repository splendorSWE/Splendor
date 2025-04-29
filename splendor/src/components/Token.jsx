import React from 'react';

export default function Token({ color, number, onClick, isSelected, isDisabled }) {
  return (
    <div
      className="token-div"
      onClick={isDisabled ? undefined : onClick}
      style={{
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        position: 'relative',
        borderRadius: '50%',
        boxSizing: 'border-box',
        opacity: isDisabled ? 0.3 : 1,
        transition: 'border 0.2s, opacity 0.2s',
      }}
    >
      <div
        style={{
          border: isSelected ? '4px solid rgb(194, 194, 194)' : 'none',
          boxShadow: isSelected ? '0 0 20px #27394D' : 'none',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />
      <img
        src={`/Images/Tokens/${color} Token.png`}
        alt={`${color} Token`}
        className="token-img"
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
        }}
      />
      <span className="token-span">
        {number}
      </span>
    </div>
  );
}
