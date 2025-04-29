import React, { useState, useEffect } from 'react';
import './Gameboard.css';
import Card from '../components/CardComponents/Card';
import PageHeader from '../components/PageHeader';
import { useAuthContext } from '../context/AuthContext';
import GetPath from '../components/CardComponents/GetPath';
import { initialDeck1, initialDeck2, initialDeck3, shuffle } from "../components/CardComponents/Deck";
import DeckManager from '../components/CardComponents/DeckManager';
import Token from '../components/Token';
import Select2Tokens from '../components/Select2Tokens';

function CollectionButton({ player }) {
  return (
    <button
      className='collection-button'
      title={player}>
      {player} Collection
    </button>
  );
}

function ReservedCard({ viewCard, setViewCard, reservable, reservedCard, selectedCard, setSelectedCard }) {
  return (

    <div className='collection-card-div' style={{ opacity: !reservable ? 1 : 0, pointerEvents: !reservable ? 'auto' : 'none' }} disabled={!reservable}>
      <img
        src="/Images/Plain Cards/Reserved Card.png"
        alt="CollectionCard"
        className='collection-card-img'
        onClick={() => {
          if (reservedCard) {
            setViewCard(true);
            setSelectedCard(reservedCard);
            console.log(GetPath(reservedCard.id))
            console.log(selectedCard)
          }
        }}
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

function PlayerCollection({ Points, tokens, playerCards, viewCard, setViewCard, reservable, reservedCard, setSelectedCard, selectedCard }) {

  return (
    <div className='player-collection-main-div'>

      <div className='player-collection-header'>
        <span className='player-collection-header-space'>{Points}</span> Points
      </div>

      <div className='player-collection-row'>
        <Token color={"Wild"} number={tokens.wild} />
        <ReservedCard viewCard={viewCard} setViewCard={setViewCard} reservable={reservable} setSelectedCard={setSelectedCard} reservedCard={reservedCard} selectedCard={selectedCard} />
      </div>
      <div className='player-collection-row'>
        <Token color={"White"} number={tokens.white} />
        <CollectionCard ImagePath={"/Images/Plain Cards/White Card.png"} number={playerCards.white} />
      </div>
      <div className='player-collection-row'>
        <Token color={"Blue"} number={tokens.blue} />
        <CollectionCard ImagePath={"/Images/Plain Cards/Blue Card.png"} number={playerCards.blue} />
      </div>
      <div className='player-collection-row'>
        <Token color={"Red"} number={tokens.red} />
        <CollectionCard ImagePath={"/Images/Plain Cards/Red Card.png"} number={playerCards.red} />
      </div>
      <div className='player-collection-row'>
        <Token color={"Green"} number={tokens.green} />
        <CollectionCard ImagePath={"/Images/Plain Cards/Green Card.png"} number={playerCards.green} />
      </div>
      <div className='player-collection-row'>
        <Token color={"Yellow"} number={tokens.yellow} />
        <CollectionCard ImagePath={"/Images/Plain Cards/Yellow Card.png"} number={playerCards.yellow} />
      </div>
    </div>
  );
}

function BoardTokens({ gameState, handleTakeTokens }) {
  const [view, setView] = useState("default");

  const [tokens, setTokens] = useState(gameState?.tokens || {
    wild: 7,
    white: 5,
    blue: 1,
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
      return <Select2Tokens tokens={tokens} setView={setView} handleTakeTokens={handleTakeTokens} handleTokenUpdate={handleTokenUpdate} />;
    case "select3":
      return <Select3Tokens tokens={tokens} setView={setView} handleTakeTokens={handleTakeTokens} handleTokenUpdate={handleTokenUpdate} />;
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

function Select3Tokens({ tokens, setView, handleTakeTokens, handleTokenUpdate }) {
  const [selectedTokens, setSelectedTokens] = useState({});

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

  return (
    <div className="board-tokens-section">
      <button className="select-tokens-button" onClick={() => setView("default")}>
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

function NobleCard({ ImagePath }) {
  return (
    <img
      src={ImagePath}
      alt="Noble Card"
      className='noble-card'
    />
  )
}


function CardPopUp({ ImagePath, viewCard, setViewCard, playable, reservable, setReservable, handlePlayCard, addReserveToken, playCard, handleReserveCard, reservedCard, selectedCard }) {

  console.log(ImagePath)
  return (
    viewCard && (
      <div className="card-pop-up-container">
        <div className="x-button" onClick={() => setViewCard(false)}>
          X
        </div>
        <img
          src={ImagePath}
          alt="Card Pop Up"
          className="card-pop-up"
        />
        <div className="pop-up-button-container">
          <div className={!playable ? "disabled-button" : "play-card-button"}
            disabled={!playable} onClick={() => {
              setViewCard(false);
              if (playable) {
                playCard();
                handlePlayCard();
              }
              if (selectedCard == reservedCard) {
                setReservable(true)
              }
            }}>
            Play Card
          </div>
          <div className={!reservable ? "disabled-button" : "play-card-button"}
            disabled={!reservable}
            onClick={() => {
              setViewCard(false);
              setReservable(false);
              playCard();
              if (reservable) {
                handleReserveCard();
              }
            }}>
            Reserve Card
          </div>
        </div>
      </div>
    )
  );
}


export default function Gameboard() {
  const [reservable, setReservable] = useState(true)
  // const [points, setPoints] = useState(0);
  const [reservedCard, setReservedCard] = useState(null)
  const [playable, setPlayable] = useState(true)
  const [viewCard, setViewCard] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [error, setError] = useState('');
  const { user } = useAuthContext();
  const [deck1, setDeck1] = useState(shuffle(initialDeck1))
  const [deck2, setDeck2] = useState(shuffle(initialDeck2))
  const [deck3, setDeck3] = useState(shuffle(initialDeck3))
  const [selectedDeck, setSelectedDeck] = useState(1)

  useEffect(() => {
    fetch('http://localhost:4000/game')
      .then((res) => res.json())
      .then((data) => setGameState(data))
      .catch((err) => console.error('Error fetching game state:', err));
  }, []);

  const makeMove = async (moveData) => {
    try {
      console.log('Making move:', moveData);
      const response = await fetch('http://localhost:4000/game/move', {
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

  const handleTakeTokens = (selectedTokens) => {
    console.log('Selected Tokens:', selectedTokens);
    const moveData = {
      action: "take_tokens",
      tokens: selectedTokens
    };
    makeMove(moveData);
  };


  const playCard1 = () => {
    console.log('selectedDeck:', selectedDeck);
    if (!selectedCard) return;
    const newDeck = deck1.filter((card) => card.id !== selectedCard.id);
    setDeck1(newDeck);
    setViewCard(false);
    setSelectedCard(null);
  };

  const playCard2 = () => {
    console.log('selectedDeck:', selectedDeck);
    if (!selectedCard) return;
    const newDeck = deck2.filter((card) => card.id !== selectedCard.id);
    setDeck2(newDeck);
    setViewCard(false);
    setSelectedCard(null);
  };

  const playCard3 = () => {
    console.log('selectedDeck:', selectedDeck);
    if (!selectedCard) return;
    const newDeck = deck3.filter((card) => card.id !== selectedCard.id);
    setDeck3(newDeck);
    setViewCard(false);
    setSelectedCard(null);
  }

  const sampleCards = {
    "/Images/MainCards/Blue 1.0.png": {
      cardId: "card1",
      cardColor: "blue",
      tokenPrice: { blue: 0, red: 1, white: 1, green: 1, yellow: 1, wild: 0 },
      points: 0
    }
  };

  const handlePlayCard = () => {
    const card = sampleCards[GetPath(selectedCard.id)];
    if (!card) {
      console.error("Card details not found");
      return;
    }
    const moveData = {
      action: "play_card",
      card: selectedCard.id
    };
    makeMove(moveData);
    setViewCard(false);
  };

  const handleReserveCard = () => {
    console.log("Reserving card");
    const card = [...deck1, ...deck2, ...deck3].find(card => card.id === selectedCard.id);
    if (!card) {
      console.error("Card details not found");
      return;
    }
    // const moveData = {
    //   action: "reserve_card",
    //   card: card
    // };
    // makeMove(moveData);
    setViewCard(false);
    setReservedCard(selectedCard);
    addReserveToken()
  };

  const addReserveToken = () => {
    console.log("Adding wild token");
    const moveData = {
      action: "take_tokens",
      tokens: { wild: 1 }
    }
    makeMove(moveData);

  };

  return (
    <div>
      <PageHeader title='Gameboard' home={true} rules={true} userauth={!user && !user?.isAnonymous} profile={!!user || user?.isAnonymous} />
      <div class='main'>
        <CardPopUp
          ImagePath={selectedCard ? GetPath(selectedCard.id) : null}
          viewCard={viewCard}
          setViewCard={setViewCard}
          reservable={reservable}
          playable={playable}
          setReservable={setReservable}
          handlePlayCard={handlePlayCard}
          addReserveToken={addReserveToken}
          setReservedCard={setReservedCard}
          playCard={
            selectedDeck === 1 ? playCard1 :
              selectedDeck === 2 ? playCard2 :
                playCard3
          }
          handleReserveCard={handleReserveCard}
          reservedCard={reservedCard}
          selectedCard={selectedCard}
        />
        <div>
          <CollectionButton player={'Your'} />
          <CollectionButton player={"Opponent's"} />
          <PlayerCollection
            Points={gameState ? gameState.points : 0}
            viewCard={viewCard}
            setViewCard={setViewCard}
            tokens={gameState ? gameState.playerTokens : { wild: 0, white: 0, blue: 0, red: 0, green: 0, yellow: 0 }}
            playerCards={gameState ? gameState.playerCards : { wild: 0, white: 0, blue: 0, red: 0, green: 0, yellow: 0 }}
            reservable={reservable}
            setReservedCard={setReservedCard}
            reservedCard={reservedCard}
            setSelectedCard={setSelectedCard}
            selectedCard={selectedCard}
          />
        </div>

        <BoardTokens gameState={gameState} handleTakeTokens={handleTakeTokens} />

        <div class='cards'>
          <div class='cards-row'>
            <DeckManager deck={deck3} onClick={(card) => {
              setSelectedCard(card);
              setViewCard(true);
              setSelectedDeck(3)
              setDeck3(deck3)
            }} />

          </div>
          <div class='cards-row'>
            <DeckManager deck={deck2} onClick={(card) => {
              setSelectedCard(card);
              setViewCard(true);
              setSelectedDeck(2)
              setDeck2(deck2)
            }} />

          </div>
          <div class='cards-row'>
            <DeckManager deck={deck1} onClick={(card) => {
              setSelectedCard(card);
              setViewCard(true);
              setSelectedDeck(1)
              setDeck1(deck1)
            }} />
          </div>
        </div>
        <div class='cards'>
          <NobleCard ImagePath={"/Images/MainCards/Noble 1.png"} />
          <NobleCard ImagePath={"/Images/MainCards/Noble 2.png"} />
          <NobleCard ImagePath={"/Images/MainCards/Noble 3.png"} />
        </div>
      </div>
    </div>
  );
}

