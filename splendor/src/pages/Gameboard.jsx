import React, { useState, useEffect } from 'react';
import './pageStyles/Gameboard.css';
import Card from '../components/CardComponents/Card';
import PageHeader from '../components/PageHeader';
import { useAuthContext } from '../context/AuthContext';
import GetPath from '../components/CardComponents/GetPath';
import { initialDeck1, initialDeck2, initialDeck3, shuffle } from "../components/CardComponents/Deck";
import DeckManager from '../components/CardComponents/DeckManager';
import GameEndPopup from '../components/GameEndPopup';
import { useNavigate } from 'react-router-dom';
import CollectionButton from '../components/GameboardComponents/CollectionButton';
import PlayerCollection from '../components/GameboardComponents/PlayerCollection';
import BoardTokens from '../components/GameboardComponents/BoardTokens/BoardTokens';
import NobleCard from '../components/GameboardComponents/NobleCard';
import CardPopUp from '../components/GameboardComponents/CardPopUp';



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
  const [showGameEnd, setShowGameEnd] = useState(false);
  const navigate = useNavigate();

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

  const checkCardAffordability = async (cardId) => {
    try {
      const response = await fetch("http://localhost:4000/game/check_affordability", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cardId: cardId }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to check card affordability");
      }
  
      const result = await response.json();
      return result.can_buy;
    } catch (error) {
      console.error("Error checking card affordability:", error);
      return false;
    }
  };

  const handlePlayCard = () => {
    const card =
      deck1.find(c => c.id === selectedCard.id) ||
      deck2.find(c => c.id === selectedCard.id) ||
      deck3.find(c => c.id === selectedCard.id);
    if (!card) {
      console.error("Card details not found");
      return;
    }
    console.log("Selected card ID:", selectedCard.id);
    const moveData = {
      action: "play_card",
      cardId: selectedCard.id
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

  const [selectedPlayer, setSelectedPlayer] = useState("My");

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
          setPlayable={setPlayable}
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
          checkCardAffordability={checkCardAffordability}
        />
        <div>
        <CollectionButton
          player="My"
          isSelected={selectedPlayer === 'My'}
          onClick={() => setSelectedPlayer('My')}
        />
        <CollectionButton
          player="Opponent"
          isSelected={selectedPlayer === 'Opponent'}
          onClick={() => setSelectedPlayer('Opponent')}
        />
          <PlayerCollection
            Points={gameState ? (selectedPlayer === "My" ? gameState.points : gameState.opponentPoints) : 0}
            tokens={gameState ? (selectedPlayer === "My" ? gameState.playerTokens : gameState.opponentTokens) : {}}
            playerCards={gameState ? (selectedPlayer === "My" ? gameState.playerCards : gameState.opponentCards) : {}}          
            //Points={gameState ? gameState.points : 0}
            viewCard={viewCard}
            setViewCard={setViewCard}
            //tokens={gameState ? gameState.playerTokens : { wild: 0, white: 0, blue: 0, red: 0, green: 0, yellow: 0 }}
            //playerCards={gameState ? gameState.playerCards : { wild: 0, white: 0, blue: 0, red: 0, green: 0, yellow: 0 }}
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
      <GameEndPopup
        visible={showGameEnd}
        winner={true}
        playerName="You"
        opponentName="Opponent"
        playerPoints={15}
        opponentPoints={10}
        playerPic={"/images/default_pfp.jpg"}
        opponentPic={"/images/default_pfp.jpg"}
        onClose={() => {setShowGameEnd(false); navigate('/')}}
      />
    </div>
  );
}

