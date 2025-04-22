from flask import Flask, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit, send, join_room, leave_room
import random
import string

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'

# CORS for React frontend at localhost:3000
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)
socketio = SocketIO(app, cors_allowed_origins="http://localhost:3000")

# Store lobby state
lobbies = {}  # lobby_code -> [usernames]
user_lobby_map = {}
ready_players = {}  # lobby_code -> set of ready usernames

# --- Utility ---
def generate_lobby_code(length=5):
    return ''.join(random.choices(string.ascii_uppercase, k=length))

# --- Socket Events ---

@socketio.on("connect")
def handle_connect():
    print(f"✅ Client connected: {request.sid}")

@socketio.on("disconnect")
def handle_disconnect():
    sid = request.sid
    lobby_code = user_lobby_map.get(sid)

    if not lobby_code or lobby_code not in lobbies:
        return

    username = None
    for name in lobbies[lobby_code]:
        if name == user_lobby_map.get(sid + "_name"):
            username = name
            break

    if username:
        lobbies[lobby_code].remove(username)

    print(f"❌ Disconnected: {username or sid} from {lobby_code}")

    leave_room(lobby_code)
    user_lobby_map.pop(sid, None)
    user_lobby_map.pop(sid + "_name", None)

    emit("lobby_info", {"players": lobbies[lobby_code]}, room=lobby_code)

@socketio.on("create_lobby")
def handle_create_lobby(data):
    username = data.get("username", "Guest")
    lobby_type = data.get("type", "Public")
    provided_code = data.get("lobbyCode")

    if lobby_type == "Private" and provided_code:
        lobby_code = provided_code
    else:
        lobby_code = generate_lobby_code()  # random 5-letter uppercase code

    lobbies[lobby_code] = [username]
    
    # ✅ Step 3: Track lobby and username by socket ID
    user_lobby_map[request.sid] = lobby_code
    user_lobby_map[request.sid + "_name"] = username

    join_room(lobby_code)

    print(f"🎮 {username} created {lobby_type} lobby {lobby_code}")

    emit("lobby_created", {"lobbyCode": lobby_code}, to=request.sid)
    emit("lobby_info", {"players": lobbies[lobby_code]}, room=lobby_code)

@socketio.on("join_lobby")
def handle_join_lobby(data):
    username = data.get("username", "Guest")
    lobby_code = data.get("lobbyCode", "").upper()

    if not lobby_code or lobby_code not in lobbies:
        emit("error", {"message": f"Lobby {lobby_code} not found."}, to=request.sid)
        return

    if len(lobbies[lobby_code]) >= 2:
        emit("error", {"message": "This lobby is already full."}, to=request.sid)
        return

    if username in lobbies[lobby_code]:
        emit("error", {"message": "Username already in lobby."}, to=request.sid)
        return

    join_room(lobby_code)
    lobbies[lobby_code].append(username)

    # ✅ Step 3: Track lobby and username by socket ID
    user_lobby_map[request.sid] = lobby_code
    user_lobby_map[request.sid + "_name"] = username

    print(f"🙋‍♂️ {username} joined lobby {lobby_code}")

    emit("lobby_info", {"players": lobbies[lobby_code]}, room=lobby_code)
    emit("lobby_info", {"players": lobbies[lobby_code]}, to=request.sid)
    emit("lobby_joined", {"lobbyCode": lobby_code}, to=request.sid)

@socketio.on("unready")
def handle_unready(data):
    sid = request.sid
    lobby_code = data.get("lobbyCode", "").upper()
    username = user_lobby_map.get(sid + "_name")

    if not lobby_code or lobby_code not in lobbies or not username:
        print("🚫 Invalid unready request.")
        return

    # Ensure ready set exists
    if lobby_code in ready_players and username in ready_players[lobby_code]:
        ready_players[lobby_code].remove(username)
        print(f"⛔ {username} un-readied in lobby {lobby_code}")

    # Emit updated list to everyone
    emit("ready_status", {
        "readyPlayers": list(ready_players.get(lobby_code, [])),
        "totalPlayers": lobbies[lobby_code],
    }, room=lobby_code)

@socketio.on("ready_up")
def handle_ready_up(data):
    sid = request.sid
    lobby_code = data.get("lobbyCode", "").upper()
    username = user_lobby_map.get(sid + "_name")

    print("🎯 received ready_up:", data)  # ✅ this MUST print if it's working

    if not lobby_code or lobby_code not in lobbies or not username:
        print("🚫 Invalid ready_up request.")
        return

    # Initialize if not already
    if lobby_code not in ready_players:
        ready_players[lobby_code] = set()

    ready_players[lobby_code].add(username)

    emit("ready_status", {
        "readyPlayers": list(ready_players[lobby_code]),
        "totalPlayers": lobbies[lobby_code],
    }, room=lobby_code)

    if set(lobbies[lobby_code]) == ready_players[lobby_code]:
        emit("game_started", {"lobbyCode": lobby_code}, room=lobby_code)
        del ready_players[lobby_code]


@socketio.on("leave_lobby")
def handle_leave_lobby():
    sid = request.sid
    lobby_code = user_lobby_map.get(sid)

    if not lobby_code or lobby_code not in lobbies:
        return

    username = None
    # Find and remove the player from the lobby list
    for name in lobbies[lobby_code]:
        if name == user_lobby_map.get(sid + "_name"):
            username = name
            break

    if username:
        lobbies[lobby_code].remove(username)

    leave_room(lobby_code)
    user_lobby_map.pop(sid, None)
    user_lobby_map.pop(sid + "_name", None)

    print(f"👋 {username or sid} left lobby {lobby_code}")

    # Notify remaining players
    emit("lobby_info", {"players": lobbies[lobby_code]}, room=lobby_code)

@socketio.on("get_lobby_info")
def handle_get_lobby_info(data):
    lobby_code = data.get("lobbyCode", "").upper()
    if lobby_code in lobbies:
        print(f"📤 Sending lobby_info for lobby {lobby_code}: {lobbies[lobby_code]}")
        emit("lobby_info", {"players": lobbies[lobby_code]}, to=request.sid)
    else:
        emit("error", {"message": "Lobby not found."}, to=request.sid)

    
@socketio.on("custom_event")
def handle_custom_event(data):
    print(f"Received from frontend: {data}")
    send(f"Backend received: {data}", broadcast=True)

# --- Run ---
if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=4000)

