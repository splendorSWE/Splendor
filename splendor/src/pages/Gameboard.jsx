import React, { useState, useEffect } from 'react';
import './Gameboard.css';
import Card from '../components/CardComponents/Card';
import PageHeader from '../components/PageHeader';
import { useAuthContext } from '../context/AuthContext';
import GetPath from '../components/CardComponents/GetPath';
import { initialDeck1, initialDeck2, initialDeck3, shuffle } from "../components/CardComponents/Deck";
import DeckManager from '../components/CardComponents/DeckManager';

function CollectionButton({ player }) {
  return (
    <button
      className='collection-button'
      title={player}>
      {player} Collection
    </button>
  );
}

function Token({ ImagePath, number }) {
  return (
    <div className='token-div'>
      <img
        src={ImagePath}
        alt="Token"
        className='token-img'
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


function PlayerCollection({ Points, tokens, playerCards, viewCard, setViewCard }) {
  return (
    <div className='player-collection-main-div'>

      <div className='player-collection-header'>
        <span className='player-collection-header-space'>{Points}</span> Points
      </div>

      <div className='player-collection-row'>
        <Token ImagePath={"/Images/Tokens/Wild Token.png"} number={tokens.wild} />
        <ReservedCard viewCard={viewCard} setViewCard={setViewCard}/>
      </div>
      <div className='player-collection-row'>
        <Token ImagePath={"/Images/Tokens/White Token.png"} number={tokens.white} />
        <CollectionCard ImagePath={"/Images/Plain Cards/White Card.png"} number={playerCards.white} />
      </div>
      <div className='player-collection-row'>
        <Token ImagePath={"/Images/Tokens/Blue Token.png"} number={tokens.blue} />
        <CollectionCard ImagePath={"/Images/Plain Cards/Blue Card.png"} number={playerCards.blue} />
      </div>
      <div className='player-collection-row'>
        <Token ImagePath={"/Images/Tokens/Red Token.png"} number={tokens.red} />
        <CollectionCard ImagePath={"/Images/Plain Cards/Red Card.png"} number={playerCards.red} />
      </div>
      <div className='player-collection-row'>
        <Token ImagePath={"/Images/Tokens/Green Token.png"} number={tokens.green} />
        <CollectionCard ImagePath={"/Images/Plain Cards/Green Card.png"} number={playerCards.green} />
      </div>
      <div className='player-collection-row'>
        <Token ImagePath={"/Images/Tokens/Yellow Token.png"} number={tokens.yellow} />
        <CollectionCard ImagePath={"/Images/Plain Cards/Yellow Card.png"} number={playerCards.yellow} />
      </div>
    </div>
  );
}

function BoardTokens({ gameState, handleTakeTokens }) {

  const tokens = gameState ? gameState.tokens : {
    wild: 0,
    white: 0,
    blue: 0,
    red: 0,
    green: 0,
    yellow: 0,
  };

  return (
    <div className="board-tokens-section">
      <button
        className='select-tokens-button'
        onClick={handleTakeTokens}
      >
        Select Tokens
      </button>
      <Token ImagePath={"/Images/Tokens/Wild Token.png"} number={tokens.wild} />
      <Token ImagePath={"/Images/Tokens/White Token.png"} number={tokens.white} />
      <Token ImagePath={"/Images/Tokens/Blue Token.png"} number={tokens.blue} />
      <Token ImagePath={"/Images/Tokens/Red Token.png"} number={tokens.red} />
      <Token ImagePath={"/Images/Tokens/Green Token.png"} number={tokens.green} />
      <Token ImagePath={"/Images/Tokens/Yellow Token.png"} number={tokens.yellow} />
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


function CardPopUp({ ImagePath, viewCard, setViewCard, playable, reservable, setReservable, handlePlayCard, addReserveToken, playCard }) {
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
              if (playable) playCard();
              playable && handlePlayCard()
            }}>
            Play Card
          </div>
          <div className={!reservable ? "disabled-button" : "play-card-button"}
              disabled={!reservable}
               onClick={() => {
                 setViewCard(false);
                 setReservable(false);
                 playCard();
                 if (reservable) addReserveToken();
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
  const [playable, setPlayable] = useState(true)
  const [viewCard, setViewCard] = useState(false)
  const [imgViewCard, setImgViewCard] = useState(null)
  const [selectedCard, setSelectedCard] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [error, setError] = useState('');
  const { user } = useAuthContext();
  const [deck1, setDeck1] = useState(shuffle(initialDeck1))
  const [deck2, setDeck2] = useState(shuffle(initialDeck2))
  const [deck3, setDeck3] = useState(shuffle(initialDeck3))
  const [selectedDeck, setSelectedDeck] = useState(1)

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
        green: 1,
        red: 1,
        yellow: 1,
        white: 1
      }
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

  const sampleCards = {
    "/Images/MainCards/Blue 1.0.png": {
      cardId: "card1",
      cardColor: "blue",
      tokenPrice: { blue: 0, red: 1, white: 1, green: 1, yellow: 1, wild: 0 },
      points: 10
    }
  };

  const handlePlayCard = () => {
    const card = sampleCards[imgViewCard];
    if (!card) {
      console.error("Card details not found");
      return;
    }
    const moveData = {
      action: "play_card",
      card: card
    };
    makeMove(moveData);
    setViewCard(false);
  };

  const addReserveToken = () => {
    console.log("Adding wild token");
    const moveData = {
      action: "take_tokens",
      tokens: { wild: 1}
    }
    makeMove(moveData);

  };

  return (
    <div>
      <PageHeader title='Gameboard' home={true} rules={true} userauth={!user && !user?.isAnonymous} profile={!!user || user?.isAnonymous} />
      <div class='main'>
        <CardPopUp
          ImagePath={imgViewCard}
          viewCard={viewCard}
          setViewCard={setViewCard}
          reservable={reservable}
          playable={playable}
          setReservable={setReservable}
          handlePlayCard={handlePlayCard} 
          addReserveToken={addReserveToken}
          playCard={ 
            selectedDeck === 1 ? playCard1 :
            selectedDeck === 2 ? playCard2 :
            playCard3
          }
        />
        <div>
          <CollectionButton player={'Your'} />
          <CollectionButton player={"Opponent's"} />
          <PlayerCollection Points={gameState ? gameState.points : 0} viewCard={viewCard} setViewCard={setViewCard}
            tokens={gameState ? gameState.playerTokens : { wild: 0, white: 0, blue: 0, red: 0, green: 0, yellow: 0 }} />
            playerCards={gameState ? gameState.playerCards: { wild: 0, white: 0, blue: 0, red: 0, green: 0, yellow: 0 }}/>
        </div>
        <div>
          <BoardTokens gameState={gameState} handleTakeTokens={handleTakeTokens} />
        </div>
        <div class='cards'>
          <div class='cards-row'>
          <DeckManager deck={deck3} onClick={(card) => {
              setSelectedCard(card);
              setImgViewCard(GetPath(card.id));
              setViewCard(true);
              setSelectedDeck(3)
              setDeck3(deck3)
            }} />
            
          </div>
          <div class='cards-row'>
          <DeckManager deck={deck2} onClick={(card) => {
              setSelectedCard(card);
              setImgViewCard(GetPath(card.id));
              setViewCard(true);
              setSelectedDeck(2)
              setDeck2(deck2)
            }} />
            
          </div>
          <div class='cards-row'>
            <DeckManager deck={deck1} onClick={(card) => {
              setSelectedCard(card);
              setImgViewCard(GetPath(card.id));
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
