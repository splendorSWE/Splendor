import React, { useState, useEffect } from 'react';
import './pageStyles/Gameboard.css';
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
// import socket from '../socket/socket';
import PageHeader from '../components/PageHeader';
import GetPath from '../components/CardComponents/GetPath';
// import { initialDeck1, initialDeck2, initialDeck3, shuffle } from "../components/CardComponents/Deck";
import DeckManager from '../components/CardComponents/DeckManager';
import GameEndPopup from '../components/GameboardComponents/GameEndPopup';
import CollectionButton from '../components/GameboardComponents/CollectionButton';
import PlayerCollection from '../components/GameboardComponents/PlayerCollection';
import BoardTokens from '../components/GameboardComponents/BoardTokens/BoardTokens';
import NobleCard from '../components/GameboardComponents/NobleCard';
import CardPopUp from '../components/GameboardComponents/CardPopUp';
import { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';


export default function Gameboard() {
  const [reservable, setReservable] = useState(true)
  const [reservedCard, setReservedCard] = useState(null)
  const [playable, setPlayable] = useState(true)
  const [viewCard, setViewCard] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null);
  const [gameState, setGameState] = useState(null);
  const [error, setError] = useState('');
  const { user } = useAuthContext();
  const [deck1, setDeck1] = useState([]);
  const [deck2, setDeck2] = useState([]);
  const [deck3, setDeck3] = useState([]);
  // const [selectedDeck, setSelectedDeck] = useState(null)
  const [showGameEnd, setShowGameEnd] = useState(true);
  const location = useLocation();
  const lobbyCode = location.state?.lobbyCode;
  const playerID = location.state?.playerID;
  const navigate = useNavigate();
  const [selectedPlayer, setSelectedPlayer] = useState("My");

  const socket = useContext(SocketContext);
  useEffect(() => {

    console.log('Location State:', location.state);

    if (lobbyCode && playerID) {
      fetch('http://localhost:4000/game', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lobbyCode, playerID }),
      })
        .then((res) => res.json())
        .then((data) => {
          setGameState(data);

          const cards = data[lobbyCode]?.available_cards;
          if (cards) {
            setDeck1(cards.level1 || []);
            setDeck2(cards.level2 || []);
            setDeck3(cards.level3 || []);
          }
        })
        .catch((err) => console.error('Error fetching game state:', err));
    }
  }, []);

  useEffect(() => {
    socket.on("game_update", (updatedState) => {
      setGameState(updatedState);
      const cards = updatedState[lobbyCode]?.available_cards;
      if (cards) {
        setDeck1(cards.level1 || []);
        setDeck2(cards.level2 || []);
        setDeck3(cards.level3 || []);
      }
    });

    return () => {
      socket.off("game_update"); // Clean up listener on unmount
    };
  }, []);

  const makeMove = async (moveData) => {
    try {
      console.log('Making move:', moveData, lobbyCode, playerID);
      const response = await fetch('http://localhost:4000/game/move', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...moveData, lobbyCode: lobbyCode, player: playerID })
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


  // const playCard1 = () => {
  //   console.log('selectedDeck:', selectedDeck);
  //   if (!selectedCard) return;
  //   const newDeck = deck1.filter((card) => card.id !== selectedCard.id);
  //   setDeck1(newDeck);
  //   setViewCard(false);
  //   setSelectedCard(null);
  // };

  // const playCard2 = () => {
  //   console.log('selectedDeck:', selectedDeck);
  //   if (!selectedCard) return;
  //   const newDeck = deck2.filter((card) => card.id !== selectedCard.id);
  //   setDeck2(newDeck);
  //   setViewCard(false);
  //   setSelectedCard(null);
  // };

  // const playCard3 = () => {
  //   console.log('selectedDeck:', selectedDeck);
  //   if (!selectedCard) return;
  //   const newDeck = deck3.filter((card) => card.id !== selectedCard.id);
  //   setDeck3(newDeck);
  //   setViewCard(false);
  //   setSelectedCard(null);
  // }

  // const sampleCards = {
  //   "/Images/MainCards/Blue 1.0.png": {
  //     cardId: "card1",
  //     cardColor: "blue",
  //     tokenPrice: { blue: 0, red: 1, white: 1, green: 1, yellow: 1, wild: 0 },
  //     points: 0
  //   }
  // };

  const checkCardAffordability = async (cardId) => {
    if (gameState?.current_turn != playerID) {
      console.log("not your turn")
      return false
    }

    try {
      // Ensure lobbyCode and playerID are available in your component's state or props
      console.log("Sending lobbyCode:", lobbyCode);
      const response = await fetch("http://localhost:4000/game/check_affordability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cardId: cardId,       // Send the cardId
          lobbyCode: lobbyCode, // Ensure lobbyCode is set properly
          player: playerID     // Ensure playerID is the correct player identifier
        })
      });

      // Check for unsuccessful response
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error checking card affordability:', errorData.error);
        throw new Error(errorData.error || "Failed to check card affordability");
      }

      // Handle success: Return the affordability result
      const result = await response.json();
      return result.can_buy;

    } catch (error) {
      console.error("Error checking card affordability:", error);
      return false;
    }
  };



  const handlePlayCard = () => {
    if (gameState?.current_turn != playerID) {
      console.log("not your turn")
      return false
    }

    const level1 = gameState.available_cards.level1 || [];
    const level2 = gameState.available_cards.level2 || [];
    const level3 = gameState.available_cards.level3 || [];

    const card =
      level1.find(c => c.id === selectedCard.id) ||
      level2.find(c => c.id === selectedCard.id) ||
      level3.find(c => c.id === selectedCard.id);
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
    if (gameState?.current_turn != playerID) {
      console.log("not your turn")
      return false
    }

    console.log("Reserving card");
    const level1 = gameState.available_cards.level1 || [];
    const level2 = gameState.available_cards.level2 || [];
    const level3 = gameState.available_cards.level3 || [];

    const card =
      level1.find(c => c.id === selectedCard.id) ||
      level2.find(c => c.id === selectedCard.id) ||
      level3.find(c => c.id === selectedCard.id);
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
      <div className='main'>
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
          gameState={gameState}
          handleReserveCard={handleReserveCard}
          reservedCard={reservedCard}
          selectedCard={selectedCard}
          checkCardAffordability={checkCardAffordability}
          playerID={playerID}
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
            Points={
              selectedPlayer === "My"
                ? gameState?.players?.[playerID]?.points || 0
                : Object.entries(gameState?.players || {})
                    .find(([id]) => id !== playerID)?.[1]?.points || 0
            } 
            tokens={
              selectedPlayer === "My"
                ? gameState?.players?.[playerID]?.tokens || {}
                : Object.entries(gameState?.players || {})
                    .find(([id]) => id !== playerID)?.[1]?.tokens || {}
            }
            playerCards={
              selectedPlayer === "My"
                ? gameState?.players?.[playerID]?.permanentGems || {}
                : Object.entries(gameState?.players || {})
                    .find(([id]) => id !== playerID)?.[1]?.permanentGems || {}
            }
            viewCard={viewCard}
            setViewCard={setViewCard}
            reservable={reservable}
            setReservedCard={setReservedCard}
            reservedCard={reservedCard}
            setSelectedCard={setSelectedCard}
            selectedCard={selectedCard}
          />
        </div>

        <BoardTokens gameState={gameState} handleTakeTokens={handleTakeTokens} playerID={playerID} />



        <div class='cards'>
          <div class='cards-row'>
            <DeckManager deck={gameState?.available_cards.level3} onClick={(card) => {


              setSelectedCard(card);
              setViewCard(true);
            }} />

          </div>


          <div class='cards-row'>
            <DeckManager deck={gameState?.available_cards.level2} onClick={(card) => {


              setSelectedCard(card);
              setViewCard(true);
            }} />

          </div>


          <div class='cards-row'>
            <DeckManager deck={gameState?.available_cards.level1} onClick={(card) => {

              setSelectedCard(card);
              setViewCard(true);
            }} />
          </div>
        </div>
        <div className='cards'>
          <NobleCard ImagePath={"/Images/MainCards/Noble 1.png"} />
          <NobleCard ImagePath={"/Images/MainCards/Noble 2.png"} />
          <NobleCard ImagePath={"/Images/MainCards/Noble 3.png"} />
        </div>
        <div>
          {/* {gameState && (
            <div className="turn-tracker">
              <h3>
                {gameState.current_turn === playerID
                  ? "Your Turn!"
                  : `Waiting for ${gameState.current_turn}'s Turn...`}
              </h3>
            </div>
          )} */}
          {gameState && (
            <div className="turn-tracker">
              <img
                src={
                  gameState.players?.[gameState.current_turn]?.photoURL ||
                  "/images/default_pfp.jpg"
                }
                alt="Profile"
                className="turn-tracker-pfp"
              />
              <span className="turn-tracker-text">
                {gameState.current_turn === playerID
                  ? "Your Turn"
                  : `${gameState.players?.[gameState.current_turn]?.username || "Opponent"}'s Turn`}
              </span>
            </div>
          )}
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
        onClose={() => { setShowGameEnd(false); navigate('/') }}
      />
    </div>
  );
}

