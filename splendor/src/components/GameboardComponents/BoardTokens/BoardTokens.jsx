import React, { useState } from 'react';
import { useEffect } from 'react';
import DefaultTokenView from './DefaultTokenView';
import SelectTokenView from './SelectTokenView';
import Select2Tokens from './Select2Tokens';
import Select3Tokens from './Select3Tokens';
  



export default function BoardTokens({ gameState, handleTakeTokens }) {
  const [view, setView] = useState("default");

  const [tokens, setTokens] = useState(gameState?.tokens || {
  });

  const handleTokenUpdate = (updatedTokens) => {
    setTokens(updatedTokens); // Update the tokens state
  };
  
  useEffect(() => {
    if (gameState?.tokens) {
      setTokens(gameState.tokens);
    }
  }, [gameState]);

  switch (view) {
    case "select":
      return <SelectTokenView tokens={tokens} setView={setView} />;
    case "select2":
      return <Select2Tokens tokens={tokens} setView={setView} handleTakeTokens={handleTakeTokens} handleTokenUpdate={handleTokenUpdate} />;
    case "select3":
      return <Select3Tokens tokens={tokens} setView={setView} handleTakeTokens={handleTakeTokens} handleTokenUpdate={handleTokenUpdate} />;
    default:
      return <DefaultTokenView tokens={tokens} setView={setView} />;
  }
}