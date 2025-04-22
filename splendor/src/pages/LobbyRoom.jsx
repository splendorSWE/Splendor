import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import socket from "../socket/socket";
import PageHeader from "../components/PageHeader";
import "./pageStyles/Home.css";



export default function LobbyRoom() {
  const location = useLocation();
  const navigate = useNavigate();
  const lobbyCode = location.state?.lobbyCode;
  const [players, setPlayers] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    if (!lobbyCode) {
      setStatusMessage("Lobby code not found. Redirecting...");
      setTimeout(() => navigate("/"), 3000);
      return;
    }
  
    // ✅ Force backend to send fresh player list
    console.log("📤 Requesting lobby_info for:", lobbyCode);
    socket.emit("get_lobby_info", { lobbyCode });
  }, [lobbyCode]);
  
  useEffect(() => {
    socket.on("lobby_info", (data) => {
      console.log("📥 Received lobby_info:", data.players);
      setPlayers(data.players || []);
    });
  
    socket.on("lobby_joined", (data) => {
      console.log("✅ Successfully joined lobby:", data.lobbyCode);
    });
  
    socket.on("game_started", (data) => {
      navigate("/Gameboard", { state: { lobbyCode: data.lobbyCode } });
    });
  
    socket.on("error", (data) => {
      console.error("❌ Error:", data.message);
      setStatusMessage(data.message);
    });
  
    return () => {
      socket.off("lobby_info");
      socket.off("lobby_joined");
      socket.off("error");
      socket.off("game_started");
    };
  }, []);
  
  
  const handleStartGame = () => {
    socket.emit("start_game", { lobbyCode });
    // TODO: setup game start
  };

  return (
    <div>
      <div className="page-header">
        <PageHeader
          title={`Lobby: ${lobbyCode}`}
          home={true}
          rules={true}
        />
      </div>

      <div className="home-container">
        <div className="option-box">
          <h2>Players in Lobby</h2>
          <ul>
            {players.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
          <p className="turn-timer">Lobby Code: {lobbyCode}</p>
          {/* TODO: link gameboard and implement game start */}
          <button className="create-button" onClick={handleStartGame}>
            Start Game
          </button>
          
        </div>
      </div>

      {statusMessage && <p className="status-message">{statusMessage}</p>}
    </div>
  );
}
