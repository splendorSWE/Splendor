import React, { useEffect } from 'react';
import '../componentStyles/CardPopUp.css';

export default function CardPopUp({ ImagePath, viewCard, setViewCard, playable, setPlayable, reservable, setReservable, handlePlayCard, addReserveToken, handleReserveCard, reservedCard, selectedCard, checkCardAffordability, gameState, playerID }) {
    useEffect(() => {
      const fetchCardAffordability = async () => {
        const isPlayable = await checkCardAffordability(selectedCard.id);
        setPlayable(isPlayable);
      };
  
      if (selectedCard) {
        fetchCardAffordability();
      }
    }, [selectedCard, checkCardAffordability, setPlayable]);
    
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
              className={`play-card-button ${!playable || gameState?.current_turn !== playerID? "disabled" : ""}`}
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