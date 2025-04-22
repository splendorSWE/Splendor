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

# --- Utility ---
def generate_lobby_code(length=5):
    return ''.join(random.choices(string.ascii_uppercase, k=length))

# --- Socket Events ---

@socketio.on("connect")
def handle_connect():
    print(f"✅ Client connected: {request.sid}")

@socketio.on("disconnect")
def handle_disconnect():
    print(f"❌ Client disconnected: {request.sid}")
    # Optional: clean up lobby memberships if needed

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
    user_lobby_map[request.sid] = lobby_code
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

    if username in lobbies[lobby_code]:
        emit("error", {"message": "Username already in lobby."}, to=request.sid)
        return
    if len(lobbies[lobby_code]) >= 2:
        emit("error", {"message": "This lobby is already full."}, to=request.sid)
        return

    join_room(lobby_code)
    lobbies[lobby_code].append(username)
    user_lobby_map[request.sid] = lobby_code

    print(f"🙋‍♂️ {username} joined lobby {lobby_code}")

   # Broadcast to all (existing) players in room
    emit("lobby_info", {"players": lobbies[lobby_code]}, room=lobby_code)

    # ALSO send just to the new user who might have missed it
    emit("lobby_info", {"players": lobbies[lobby_code]}, to=request.sid)

    # Confirm join
    emit("lobby_joined", {"lobbyCode": lobby_code}, to=request.sid)

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

