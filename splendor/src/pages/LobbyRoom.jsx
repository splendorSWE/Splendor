import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import socket from "../socket/socket";
import PageHeader from "../components/PageHeader";
import "./pageStyles/Home.css";
import { useAuthContext } from "../context/AuthContext";



export default function LobbyRoom() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const displayName = location.state?.username;
  const lobbyCode = location.state?.lobbyCode;
  const [players, setPlayers] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");
  const [hasReceivedLobbyInfo, setHasReceivedLobbyInfo] = useState(false);
  const [isValidLobbyMember, setIsValidLobbyMember] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [readyPlayers, setReadyPlayers] = useState([]);
  
 
  useEffect(() => {
    if (!isValidLobbyMember) {
      navigate("/", { replace: true });
    }
  }, [isValidLobbyMember]);

  
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
    if (hasReceivedLobbyInfo && !isValidLobbyMember) {
      console.warn("⚠️ User not in lobby — redirecting");
      navigate("/", { replace: true });
    }
  }, [hasReceivedLobbyInfo, isValidLobbyMember]);
  useEffect(() => {
    socket.on("lobby_info", (data) => {
      console.log("📥 Received lobby_info:", data.players);
      setPlayers(data.players || []);
      setHasReceivedLobbyInfo(true);
  
      const isInLobby = data.players?.includes(displayName);
      setIsValidLobbyMember(isInLobby);
    });
  
    socket.on("lobby_joined", (data) => {
      console.log("✅ Successfully joined lobby:", data.lobbyCode);
    });
  
    socket.on("ready_status", (data) => {
      console.log("🔄 Ready players:", data.readyPlayers);
      setReadyPlayers(data.readyPlayers || []);
    });
  
    socket.on("game_started", (data) => {
      console.log("🎮 Game is starting!");
      localStorage.removeItem("lobbyCode");
      localStorage.removeItem("lobbyUsername");
      navigate("/Gameboard", { state: { lobbyCode: data.lobbyCode } });
    });
  
    socket.on("error", (data) => {
      console.error("❌ Error:", data.message);
      setStatusMessage(data.message);
    });
  
    return () => {
      socket.off("lobby_info");
      socket.off("lobby_joined");
      socket.off("ready_status");
      socket.off("game_started");
      socket.off("error");
    };
  }, []);
  
  useEffect(() => {
    const handleUnload = () => {
      socket.emit("leave_lobby");
    };
  
    // ✅ Only register leave for actual tab close / reload
    window.addEventListener("beforeunload", handleUnload);
  
    // ❌ Don't call leave() here
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);
  
  
  const handleStartGame = () => {
    socket.emit("start_game", { lobbyCode });
    navigate("/gameboard")
    // TODO: setup game start
  };

  return (
    <div>
      <div className="page-header">
        <PageHeader
          title={`Lobby: ${lobbyCode}`}
          home={false}
          rules={false}
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
          {/* <button
            className="create-button"
            disabled={isReady}
            onClick={() => {
              const nextState = !isReady;
              setIsReady(nextState);
            
              if (nextState) {
                console.log("📤 Sending ready_up", lobbyCode); // ✅ this should appear
                socket.emit("ready_up", { lobbyCode });
              } else {
                console.log("📤 Sending unready", lobbyCode);
                socket.emit("unready", { lobbyCode });
              }
            }}
            
          >
            {isReady ? "Waiting..." : "Ready Up"}
        </button> */}
        <button
          className="create-button"
          onClick={() => {
            const nextState = !isReady;
            setIsReady(nextState);

            if (nextState) {
              socket.emit("ready_up", { lobbyCode });
            } else {
              socket.emit("unready", { lobbyCode });
            }
          }}
        >
            {isReady ? "Unready" : "Ready Up"}
        </button>


          <button
            className="create-button"
            onClick={() => {
              socket.emit("leave_lobby");

              
              navigate("/");
            }}
          >
            Leave Lobby
          </button>
        </div>
      </div>
      {statusMessage && <p className="status-message">{statusMessage}</p>}
    </div>
  );
}
