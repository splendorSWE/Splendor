import React, { useEffect } from 'react';
import '../ComponentStyles/CardPopUp.css';

export default function CardPopUp({ ImagePath, viewCard, setViewCard, playable, setPlayable, reservable, setReservable, setReservedCard, reservedCard, selectedCard, gameState, playerID, makeMove, checkCardAffordability }) {
  useEffect(() => {
    const fetchCardAffordability = async () => {
      const isPlayable = await checkCardAffordability(selectedCard.id);
      setPlayable(isPlayable);
    };

    if (selectedCard) {
      fetchCardAffordability();
    }
  }, [selectedCard, checkCardAffordability, setPlayable]);


  const handlePlayCard = () => {
    if (gameState?.current_turn != playerID) {
      console.log("not your turn")
      return false
    }

    const level1 = gameState.available_cards.level1 || [];
    const level2 = gameState.available_cards.level2 || [];
    const level3 = gameState.available_cards.level3 || [];

    const reserved = gameState.players?.[playerID]?.reservedCard;

    const card =
      level1.find(c => c.id === selectedCard.id) ||
      level2.find(c => c.id === selectedCard.id) ||
      level3.find(c => c.id === selectedCard.id) ||
      (reserved && reserved.id === selectedCard.id ? reserved : null);

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
    console.log("reserving card")
    const moveData = {
      action: "reserve_card",
      cardId: selectedCard.id
    };
    console.log("Sending moveData:", moveData);
    makeMove(moveData);
    setViewCard(false);
    setReservedCard(selectedCard);
  };

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
          <button
            className={`play-card-button ${!playable || gameState?.current_turn !== playerID ? "disabled" : ""}`}
            onClick={() => {
              if (!playable) return;
              setViewCard(false);
              handlePlayCard();
              if (selectedCard == reservedCard) {
                setReservable(true);
              }
            }}
          >
            Play
          </button>

          <button className={`play-card-button ${!reservable || gameState?.current_turn !== playerID ? "disabled" : ""}`}

            disabled={!reservable || gameState?.current_turn !== playerID}

            onClick={() => {
              setViewCard(false);
              setReservable(false);
              if (reservable) {
                handleReserveCard();
              }
            }}>
            Reserve
          </button>
        </div>
      </div>
    )
  );
}