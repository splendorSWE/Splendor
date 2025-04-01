import React, { useState } from 'react';
import './Gameboard.css';
import PageHeader from '../components/PageHeader';

function CollectionButton({ player }) {
  return (
    <button
      style={{
        height: '60px',
        width: '105px',
        marginTop: '40px',
        marginLeft: '10px',
        fontFamily: 'Inknut Antiqua, sans-serif',
        fontWeight: '800',
        lineHeight: '20px'
      }}
      title={player}
    >
      {player} Collection
    </button>
  );
}

function Token({ ImagePath, number }) {
  return (
    <div
      style={{
        position: 'relative',
        width: '80px',
        height: '80px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '5px'
      }}
    >
      <img src={ImagePath} alt="Token" style={{ width: '80px', height: '80px' }} />
      <span
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '35px',
          fontWeight: '900',
          color: 'black',
          fontFamily: 'Ponomar, sans-serif'
        }}
      >
        {number}
      </span>
    </div>
  );
}

function ReservedCard() {
  return (
    <div
      style={{
        position: 'relative',
        width: '56.41px',
        height: '80px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '5px',
        marginLeft: '40px'
      }}
    >
      <img
        src="/Images/Plain Cards/Reserved Card.png"
        alt="CollectionCard"
        style={{ width: '56.41px', height: '80px' }}
      />
      <span
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '20px',
          fontWeight: '800',
          color: 'White',
          fontFamily: 'Ponomar, sans-serif'
        }}
      >
        Res
      </span>
    </div>
  );
}

function CollectionCard({ ImagePath, number }) {
  return (
    <div
      style={{
        position: 'relative',
        width: '56.41px',
        height: '80px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '5px',
        marginLeft: '40px'
      }}
    >
      <img
        src={ImagePath}
        alt="CollectionCard"
        style={{ width: '56.41px', height: '80px' }}
      />
      <span
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '35px',
          fontWeight: '900',
          color: 'black',
          fontFamily: 'Ponomar, sans-serif'
        }}
      >
        {number}
      </span>
    </div>
  );
}

function PlayerCollection({ Points }) {
  return (
    <div
      style={{
        left: '20px',
        width: '220px',
        marginTop: '10px',
        marginLeft: '10px',
        height: '580px',
        backgroundColor: '#E8E8E8',
        boxShadow: '2px 0 5px rgba(0,0,0,0.2)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      {/* Centered Points Label */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '40px',
          fontFamily: 'Fondamento, sans-serif',
          marginTop: '10px',
          fontWeight: '600',
          width: '100%',
          textAlign: 'center'
        }}
      >
        <span style={{ marginRight: '10px' }}>{Points}</span> Points
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Token ImagePath={"/Images/Tokens/Wild Token.png"} number={1} />
        <ReservedCard />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Token ImagePath={"/Images/Tokens/White Token.png"} number={1} />
        <CollectionCard ImagePath={"/Images/Plain Cards/White Card.png"} number={1} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Token ImagePath={"/Images/Tokens/Blue Token.png"} number={2} />
        <CollectionCard ImagePath={"/Images/Plain Cards/Blue Card.png"} number={1} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Token ImagePath={"/Images/Tokens/Red Token.png"} number={1} />
        <CollectionCard ImagePath={"/Images/Plain Cards/Red Card.png"} number={1} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Token ImagePath={"/Images/Tokens/Green Token.png"} number={1} />
        <CollectionCard ImagePath={"/Images/Plain Cards/Green Card.png"} number={1} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Token ImagePath={"/Images/Tokens/Yellow Token.png"} number={0} />
        <CollectionCard ImagePath={"/Images/Plain Cards/Yellow Card.png"} number={1} />
      </div>
    </div>
  );
}

function BoardTokens({ handleTakeTokens }) {
  return (
    <div className="board-tokens-section">
      <button
        style={{
          width: '150px',
          height: '50px',
          fontFamily: 'Inknut Antiqua, sans-serif',
          fontWeight: '800',
          lineHeight: '20px',
          marginBottom: '15px'
        }}
        onClick={handleTakeTokens}
      >
        Select Tokens
      </button>
      <Token ImagePath={"/Images/Tokens/Wild Token.png"} number={3} />
      <Token ImagePath={"/Images/Tokens/White Token.png"} number={3} />
      <Token ImagePath={"/Images/Tokens/Blue Token.png"} number={3} />
      <Token ImagePath={"/Images/Tokens/Red Token.png"} number={3} />
      <Token ImagePath={"/Images/Tokens/Green Token.png"} number={3} />
      <Token ImagePath={"/Images/Tokens/Yellow Token.png"} number={3} />
    </div>
  );
}

function DevelopmentCard({ ImagePath }) {
  return (
    <img
      src={ImagePath}
      alt="Development Card"
      className="development-card"
    />
  );
}

function NobleCard({ ImagePath }) {
  return (
    <img
      src={ImagePath}
      alt="Noble Card"
      className="noble-card"
    />
  );
}

export default function Gameboard() {
  const [gameState, setGameState] = useState(null);
  const [error, setError] = useState('');

  const makeMove = async (moveData) => {
    try {
      console.log('Making move:', moveData);
      const response = await fetch('http://127.0.0.1:5000/game/move', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(moveData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error);
        console.error('Error from server:', errorData.error);
        return;
      }
      const updatedState = await response.json();
      console.log('Updated game state:', updatedState);
      setGameState(updatedState);
      setError('');
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Error making move.');
    }
  };

  const handleTakeTokens = () => {
    console.log('Select Tokens button clicked');
    const moveData = {
      action: "take_tokens",
      tokens: {
        blue: 1,
        red: 1
      }
    };
    makeMove(moveData);
  };

  return (
    <div>
      <PageHeader title="Gameboard" />
      <div className="main">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div>
            <CollectionButton player="Your" />
            <CollectionButton player="Opponent's" />
            <PlayerCollection Points={10} />
          </div>
          <div>
            <BoardTokens handleTakeTokens={handleTakeTokens} />
          </div>
          <div className="cards">
            <div className="cards-row">
              <DevelopmentCard ImagePath={"/Images/MainCards/Blue 3.0.png"} />
              <DevelopmentCard ImagePath={"/Images/MainCards/Green 3.0.png"} />
              <DevelopmentCard ImagePath={"/Images/MainCards/Red 3.0.png"} />
              <DevelopmentCard ImagePath={"/Images/MainCards/White 3.0.png"} />
              <NobleCard ImagePath={"/Images/MainCards/Noble 1.png"} />
            </div>
            <div className="cards-row">
              <DevelopmentCard ImagePath={"/Images/MainCards/Blue 2.0.png"} />
              <DevelopmentCard ImagePath={"/Images/MainCards/Green 2.0.png"} />
              <DevelopmentCard ImagePath={"/Images/MainCards/Red 2.0.png"} />
              <DevelopmentCard ImagePath={"/Images/MainCards/White 2.0.png"} />
              <NobleCard ImagePath={"/Images/MainCards/Noble 2.png"} />
            </div>
            <div className="cards-row">
              <DevelopmentCard ImagePath={"/Images/MainCards/Blue 1.0.png"} />
              <DevelopmentCard ImagePath={"/Images/MainCards/Green 1.0.png"} />
              <DevelopmentCard ImagePath={"/Images/MainCards/Red 1.0.png"} />
              <DevelopmentCard ImagePath={"/Images/MainCards/White 1.0.png"} />
              <NobleCard ImagePath={"/Images/MainCards/Noble 3.png"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
