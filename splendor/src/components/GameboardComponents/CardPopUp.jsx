import React, { useEffect } from 'react';

export default function CardPopUp({ ImagePath, viewCard, setViewCard, playable, setPlayable, reservable, setReservable, handlePlayCard, addReserveToken, playCard, handleReserveCard, reservedCard, selectedCard, checkCardAffordability }) {
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
            <div
              className={`play-card-button ${!playable ? "disabled" : ""}`}
              onClick={() => {
                if (!playable) return;
                setViewCard(false);
                playCard();
                handlePlayCard();
                if (selectedCard == reservedCard) {
                  setReservable(true);
                }
              }}
            >
              Play
            </div>
  
            <div className={`play-card-button ${!reservable ? "disabled" : ""}`}
  
              disabled={!reservable}
  
              onClick={() => {
                setViewCard(false);
                setReservable(false);
                playCard();
                if (reservable) {
                  handleReserveCard();
                }
              }}>
              Reserve
            </div>
          </div>
        </div>
      )
    );
  }