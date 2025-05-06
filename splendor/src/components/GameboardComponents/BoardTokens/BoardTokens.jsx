import React, { useState } from 'react';
import { useEffect } from 'react';
import DefaultTokenView from './DefaultTokenView';
import SelectTokenView from './SelectTokenView';
import Select2Tokens from './Select2Tokens';
import Select3Tokens from './Select3Tokens';  

export default function BoardTokens({ gameState, handleTakeTokens, playerID }) {
  const [view, setView] = useState("default");
  const tokenOrder = ['wild', 'white', 'blue', 'red', 'green', 'yellow'];

  const [tokens, setTokens] = useState(gameState?.tokens || {
  });
  const [isTurn, setIsTurn] = useState(gameState?.current_turn === playerID)

  const handleTokenUpdate = () => {
    setTokens(gameState.tokens);
  };
  
  useEffect(() => {
    if (gameState?.tokens) {
      setTokens(gameState.tokens);
    }
    if (gameState?.current_turn){
      console.log("not your turn")
      setIsTurn(gameState?.current_turn === playerID)
    }
  }, [gameState]);

  switch (view) {
    case "select":
      return <SelectTokenView tokens={tokens} setView={setView} tokenOrder={tokenOrder} />;
    case "select2":
      return <Select2Tokens tokens={tokens} setView={setView} handleTakeTokens={handleTakeTokens} handleTokenUpdate={handleTokenUpdate} tokenOrder={tokenOrder}/>;
    case "select3":
      return <Select3Tokens tokens={tokens} setView={setView} handleTakeTokens={handleTakeTokens} handleTokenUpdate={handleTokenUpdate} tokenOrder={tokenOrder}/>;
    default:
      return <DefaultTokenView tokens={tokens} setView={setView} tokenOrder={tokenOrder} isTurn={isTurn}/>;
  }
}