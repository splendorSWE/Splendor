import React, { useState, useEffect } from 'react';
import './Gameboard.css';
import PageHeader from '../components/PageHeader';
import { useAuthContext } from '../context/AuthContext';

function CollectionButton({ player }) {
  return (
    <button 
    className='collection-button' 
    title={player}>
      {player} Collection
    </button>
  );
}

function Token({ color, number, onClick, isSelected, isDisabled }) {
  return (
    <div
      className='token-div'
      onClick={isDisabled ? undefined : onClick}
      style={{
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        position: 'relative',  // Ensure that border and image stay in sync
        borderRadius: '50%',
        boxSizing: 'border-box',
        opacity: isDisabled ? 0.3 : 1,  // Lower opacity for disabled tokens
        transition: 'border 0.2s, opacity 0.2s',
      }}
    >
      <div
        style={{
          border: isSelected ? '4px solid rgb(194, 194, 194)' : 'none',
          boxShadow: isSelected ? '0 0 20px #27394D' : 'none',
          position: 'absolute',  // To make sure the border doesn't affect layout
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: '50%',
          pointerEvents: 'none',  // Prevent the border div from interfering with clicks
        }}
      />
      <img
        src={`/Images/Tokens/${color} Token.png`}
        alt={`${color} Token`}
        className='token-img'
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
        }}
      />
      <span className='token-span'>
        {number}
      </span>
    </div>
  );
}



function ReservedCard({ viewCard, setViewCard }) {
  return (
    <div className='collection-card-div'>
      <img
        src="/Images/Plain Cards/Reserved Card.png"
        alt="CollectionCard"
        className='collection-card-img'
        onClick={() => setViewCard(!viewCard)}
      />
      <span className='reserved-card-span'>
        Res
      </span>
    </div>
  );
}

function CollectionCard({ ImagePath, number }) {
  return (
    <div className='collection-card-div'>
      <img
        src={ImagePath}
        alt="CollectionCard"
        className='collection-card-img'
      />
      <span className='collection-card-span'>
        {number}
      </span>
    </div>
  );
}


function PlayerCollection({ Points, viewCard, setViewCard, setReservable }) {
  return (
    <div className='player-collection-main-div'>

      <div className='player-collection-header'>
        <span className='player-collection-header-space'>{Points}</span> Points
      </div>

      <div className='player-collection-row'>
        <Token color={"Wild"} number={1} />
        <ReservedCard viewCard={viewCard} setViewCard={setViewCard}/>
      </div>
      <div className='player-collection-row'>
        <Token color={"White"} number={1} />
        <CollectionCard ImagePath={"/Images/Plain Cards/White Card.png"} number={1} />
      </div>
      <div className='player-collection-row'>
        <Token color={"Blue"} number={2} />
        <CollectionCard ImagePath={"/Images/Plain Cards/Blue Card.png"} number={1} />
      </div>
      <div className='player-collection-row'>
        <Token color={"Red"} number={1} />
        <CollectionCard ImagePath={"/Images/Plain Cards/Red Card.png"} number={1} />
      </div>
      <div className='player-collection-row'>
        <Token color={"Green"} number={1} />
        <CollectionCard ImagePath={"/Images/Plain Cards/Green Card.png"} number={1} />
      </div>
      <div className='player-collection-row'>
        <Token color={"Yellow"} number={0} />
        <CollectionCard ImagePath={"/Images/Plain Cards/Yellow Card.png"} number={1} />
      </div>
    </div>
  );
}

function BoardTokens({ gameState, handleTakeTokens }) {
  const [view, setView] = useState("default");

  const [tokens, setTokens] = useState(gameState?.tokens || {
    wild: 7,
    white: 5,
    blue: 5,
    red: 3,
    green: 5,
    yellow: 0,
  });

  const handleTokenUpdate = (updatedTokens) => {
    setTokens(updatedTokens); // Update the tokens state
  };

  switch (view) {
    case "select":
      return <SelectTokenView tokens={tokens} setView={setView} />;
    case "select2":
      return <Select2Tokens tokens={tokens} setView={setView} handleTakeTokens={handleTakeTokens} handleTokenUpdate={handleTokenUpdate}/>;
    case "select3":
      return <Select3Tokens tokens={tokens} setView={setView} handleTakeTokens={handleTakeTokens} handleTokenUpdate={handleTokenUpdate}/>;
    default:
      return <DefaultTokenView tokens={tokens} setView={setView} />;
  }
}

function DefaultTokenView({ tokens, setView }) {
  return (
    <div className="board-tokens-section">
      <button className='select-tokens-button' onClick={() => setView("select")}>
        Select Tokens
      </button>

      <div className='selection-choice-row'>
        <button className="select-tokens-choice-button inactive-choice" disabled>
          Choose 2
        </button>
        <button className="select-tokens-choice-button inactive-choice" disabled>
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

function SelectTokenView({ tokens, setView }) {
  return (
    <div className="board-tokens-section">
      <button className='select-tokens-button' onClick={() => setView("default")}>
        Back
      </button>

      <div className='selection-choice-row'>
        <button className="select-tokens-choice-button" onClick={() => setView("select2")}>
          Choose 2
        </button>
        <button className="select-tokens-choice-button" onClick={() => setView("select3")}>
          Choose 3
        </button>
      </div>

      {Object.entries(tokens).map(([color, number]) => (
        <Token key={color} color={color} number={number} />
      ))}

      <button className='confirm-tokens-button' disabled={true}>
        Confirm
      </button>
    </div>
  );
}

function Select2Tokens({ tokens, setView, handleTakeTokens, handleTokenUpdate }) {
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
  
      // If clicking the same token again, unselect it
      if (previouslySelectedColor === color) {
        updatedTokens[color] += 2; // Restore 2 tokens
        handleTokenUpdate(updatedTokens);
        return {}; // Clear selection
      }
  
      // Switching to a new token
      if (previouslySelectedColor) {
        updatedTokens[previouslySelectedColor] += 2; // Restore old selection
      }
  
      updatedTokens[color] -= 2; // Subtract from new selection
      handleTokenUpdate(updatedTokens);
      return { [color]: 2 };
    });
  };
  
  

  return (
    <div className="board-tokens-section">
      <button className='select-tokens-button' onClick={() => setView("default")}>
        Back
      </button>

      <div className='selection-choice-row'>
        <button className="select-tokens-choice-button active-choice" onClick={() => setView("select2")}>
          Choose 2
        </button>
        <button className="select-tokens-choice-button" onClick={() => setView("select3")}>
          Choose 3
        </button>
      </div>

      {Object.entries(tokens).map(([color, number]) => (
        <Token
          key={color}
          color={color}
          number={number}
          onClick={() => handleTokenClick(color, number)}  // Handle the selection change
          isSelected={selectedTokens[color] === 2}  // Is this token selected?
          isDisabled={number < 2}  // Disable selection if less than 2 tokens available
        />
      ))}

      <button 
        className='confirm-tokens-button' 
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

function Select3Tokens({ tokens, setView, handleTakeTokens, handleTokenUpdate }) {
  const [selectedTokens, setSelectedTokens] = useState({});

  const isValidSelection = () => {
    const total = Object.values(selectedTokens).reduce((a, b) => a + b, 0);
    return total === 3;
  };

  const handleTokenClick = (color, number) => {
    setSelectedTokens((prev) => {
      const updatedTokens = { ...tokens };

      // Deselect if already selected
      if (prev[color] === 1) {
        updatedTokens[color] += 1;
        handleTokenUpdate(updatedTokens);

        const { [color]: _, ...rest } = prev;
        return rest;
      }

      // Do nothing if already selected 3 tokens
      if (Object.keys(prev).length >= 3) {
        return prev;
      }

      // Select new token
      updatedTokens[color] -= 1;
      handleTokenUpdate(updatedTokens);

      return { ...prev, [color]: 1 };
    });
  };

  return (
    <div className="board-tokens-section">
      <button className="select-tokens-button" onClick={() => setView("default")}>
        Back
      </button>

      <div className="selection-choice-row">
        <button className="select-tokens-choice-button" onClick={() => setView("select2")}>
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
          onClick={() => handleTokenClick(color, number)}
          isSelected={selectedTokens[color] === 1}
          isDisabled={number < 1}
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



function DevelopmentCard({ ImagePath, setViewCard, setImgViewCard }) {
  return (
    <img
      src={ImagePath}
      alt="Development Card"
      class='development-card'
      onClick={() => { setViewCard(true); setImgViewCard(ImagePath) }}
    />
  )
}

function NobleCard({ ImagePath }) {
  return (
    <img
      src={ImagePath}
      alt="Noble Card"
      class='noble-card'
    />
  )
}

function CardPopUp({ ImagePath, viewCard, setViewCard, playable, reservable, setReservable }) {
  return (
    viewCard && (
      <div className="card-pop-up-container">
        <div className="x-button" onClick={() => {
          setViewCard(false);
        }}>
          X
        </div>
        <img
          src={ImagePath}
          alt="Card Pop Up"
          className="card-pop-up"
        />
        <div className="pop-up-button-container">
          <div className={!playable ? "disabled-button" : "play-card-button"}
            disabled={!playable} onClick={() => setViewCard(false)}>
            Play Card
          </div>
          {/* need to gray out if player already has a reserved card */}
          <div className={!reservable ? "disabled-button" : "play-card-button"}
            disabled={!reservable} onClick={() => {setViewCard(false); setReservable(false)}}>
            Reserve Card
          </div>
        </div>
      </div>
    )
  );
}


export default function Gameboard() {
  const [reservable, setReservable] = useState(true)
  const [playable, setPlayable] = useState(true)
  const [viewCard, setViewCard] = useState(false)
  const [imgViewCard, setImgViewCard] = useState("/Images/MainCards/Yellow 3.0.png")
  const [gameState, setGameState] = useState(null);
  const [error, setError] = useState('');
  const {user} = useAuthContext();
  useEffect(() => {
    fetch('http://127.0.0.1:5000/game')
      .then((res) => res.json())
      .then((data) => setGameState(data))
      .catch((err) => console.error('Error fetching game state:', err));
  }, []);

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
      <PageHeader title='Gameboard' home={true} rules={true} userauth={!user && !user?.isAnonymous} profile={!!user || user?.isAnonymous} />
      <div class='main'>
        <CardPopUp ImagePath={imgViewCard} viewCard={viewCard} setViewCard={setViewCard} reservable={reservable} playable={playable} setReservable={setReservable} />
        <div>
          <CollectionButton player={'Your'} />
          <CollectionButton player={"Opponent's"} />
          <PlayerCollection Points={10} viewCard={viewCard} setViewCard={setViewCard}
          tokens={gameState ? gameState.playerTokens : { wild: 0, white: 0, blue: 0, red: 0, green: 0, yellow: 0 }}/>
        </div>
        
        <BoardTokens gameState={gameState} handleTakeTokens={handleTakeTokens} />
        
        <div class='cards'>
          <div class='cards-row'>
            <DevelopmentCard ImagePath={"/Images/MainCards/Blue 3.0.png"} setViewCard={setViewCard} setImgViewCard={setImgViewCard} />
            <DevelopmentCard ImagePath={"/Images/MainCards/Green 3.0.png"} setViewCard={setViewCard} setImgViewCard={setImgViewCard} />
            <DevelopmentCard ImagePath={"/Images/MainCards/Red 3.0.png"} setViewCard={setViewCard} setImgViewCard={setImgViewCard} />
            <DevelopmentCard ImagePath={"/Images/MainCards/White 3.0.png"} setViewCard={setViewCard} setImgViewCard={setImgViewCard} />
            <NobleCard ImagePath={"/Images/MainCards/Noble 1.png"} />
          </div>
          <div class='cards-row'>
            <DevelopmentCard ImagePath={"/Images/MainCards/Blue 2.0.png"} setViewCard={setViewCard} setImgViewCard={setImgViewCard} />
            <DevelopmentCard ImagePath={"/Images/MainCards/Green 2.0.png"} setViewCard={setViewCard} setImgViewCard={setImgViewCard} />
            <DevelopmentCard ImagePath={"/Images/MainCards/Red 2.0.png"} setViewCard={setViewCard} setImgViewCard={setImgViewCard} />
            <DevelopmentCard ImagePath={"/Images/MainCards/White 2.0.png"} setViewCard={setViewCard} setImgViewCard={setImgViewCard} />
            <NobleCard ImagePath={"/Images/MainCards/Noble 2.png"} />
          </div>
          <div class='cards-row'>
            <DevelopmentCard ImagePath={"/Images/MainCards/Blue 1.0.png"} setViewCard={setViewCard} setImgViewCard={setImgViewCard} />
            <DevelopmentCard ImagePath={"/Images/MainCards/Green 1.0.png"} setViewCard={setViewCard} setImgViewCard={setImgViewCard} />
            <DevelopmentCard ImagePath={"/Images/MainCards/Red 1.0.png"} setViewCard={setViewCard} setImgViewCard={setImgViewCard} />
            <DevelopmentCard ImagePath={"/Images/MainCards/White 1.0.png"} setViewCard={setViewCard} setImgViewCard={setImgViewCard} />
            <NobleCard ImagePath={"/Images/MainCards/Noble 3.png"} />
          </div>
        </div>
      </div>
    </div>
  );
}
  