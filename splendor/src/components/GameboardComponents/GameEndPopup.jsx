
import React from "react";
import "../../pages/pageStyles/GameEnd.css";

export default function GameEndPopup({ visible, winner, playerName, opponentName, playerPoints, opponentPoints, playerPic, opponentPic, onClose }) {
  if (!visible) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="close-button" onClick={onClose}>X</div>
        <h1 className="result-header">{winner ? "You Win!" : "You Lose."}</h1>

        <div className="players-summary">
          <div className="player-box">
            <img src={playerPic} alt="Player" className="profile-pic" />
            <p className="player-name">{playerName}</p>
            <p className="player-score">Points: {playerPoints}</p>
          </div>

          <div className="vs-text">vs</div>

          <div className="player-box">
            <img src={opponentPic} alt="Opponent" className="profile-pic" />
            <p className="player-name">{opponentName}</p>
            <p className="player-score">Points: {opponentPoints}</p>
          </div>
        </div>

        <button className="return-button" onClick={onClose}>
          Return to Home
        </button>
      </div>
    </div>
  );
}
