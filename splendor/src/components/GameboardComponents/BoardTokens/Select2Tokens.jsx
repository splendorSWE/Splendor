import React, { useState, useEffect } from 'react';
import Token from '../Token';

export default function Select2Tokens({ tokens, setView, handleTakeTokens, handleTokenUpdate, tokenOrder }) {
  const [selectedTokens, setSelectedTokens] = useState({});
  const [localTokens, setLocalTokens] = useState(tokens);
  const [initialTokens, setInitialTokens] = useState({});

  useEffect(() => {
    setInitialTokens({ ...tokens });
  }, []);

  const isValidSelection = () => {
    const values = Object.values(selectedTokens);
    const total = values.reduce((a, b) => a + b, 0);
    return total === 2 && values.some(val => val === 2);
  };

  const handleTokenClick = (color) => {
    setSelectedTokens((prevSelected) => {
      const updatedTokens = { ...localTokens };

      const previouslySelectedColor = Object.keys(prevSelected)[0];

      if (previouslySelectedColor === color) {
        updatedTokens[color] += 2;
        setLocalTokens(updatedTokens);
        handleTokenUpdate();
        return {};
      }

      if (previouslySelectedColor) {
        updatedTokens[previouslySelectedColor] += 2;
      }

      updatedTokens[color] -= 2;
      setLocalTokens(updatedTokens);
      handleTokenUpdate();

      return { [color]: 2 };
    });
  };

  const handleBack = () => {
    handleTokenUpdate();
    setView("default");
  };


  return (
    <div className="board-tokens-section">
      <button className="select-tokens-button" onClick={handleBack}>
        Back
      </button>

      <div className="selection-choice-row">
        <button className="select-tokens-choice-button active-choice" onClick={() => setView("select2")}>
          Choose 2
        </button>
        <button
          className="select-tokens-choice-button dimmed-choice"
          onClick={() => {
            setView("select3");
          }}
        >
          Choose 3
        </button>
      </div>

      {(tokenOrder ?? []).map(color => {
        const number = tokens?.[color] ?? 0;
        return (
          <Token
            key={color}
            color={color}
            number={number}
            alt={`${color} Token`}
            onClick={color === 'wild' ? undefined : () => handleTokenClick(color, number)}
            isSelected={selectedTokens?.[color] === 2}
            isDisabled={color === 'wild' || (number < 4 && !selectedTokens?.[color])}
          />
        );
      })}

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