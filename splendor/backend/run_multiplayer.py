# needed installations
    # pip3 install flask
    # pip3 install flask_cors
    # pip3 install flask_socketio
    # to run it (if you're in the splendor directory) ---> python3 backend/run.py

# from flask import Flask, request, jsonify
# from flask_cors import CORS
# from flask_socketio import SocketIO, emit
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit, send, join_room, leave_room
import random
from random import shuffle
import string
from cards import initial_deck1, initial_deck2, initial_deck3


app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)
socketio = SocketIO(app, cors_allowed_origins="http://localhost:3000")


ALL_CARDS = {
    c["id"]: {
        **c,  # Retain all other fields like id, color, level, etc.
        "tokenPrice": {
            "red": c.get("redPrice", 0),
            "green": c.get("greenPrice", 0),
            "blue": c.get("bluePrice", 0),
            "yellow": c.get("yellowPrice", 0),
            "white": c.get("whitePrice", 0),
            "wild": 0,  # You can add wild if needed for now, set to 0
        }
    }
    for c in (initial_deck1 + initial_deck2 + initial_deck3)
}
COLORS = ["red", "green", "blue", "yellow", "white"]

game_states = {}  # lobby_code -> game_state

def initialize_game_state(players):
    deck1 = initial_deck1.copy()
    deck2 = initial_deck2.copy()
    deck3 = initial_deck3.copy()
    shuffle(deck1)
    shuffle(deck2)
    shuffle(deck3)

    return {
        "players": {
            player: {
                "tokens": {color: 0 for color in COLORS + ["wild"]},
                "permanentGems": {color: 0 for color in COLORS},
                "points": 0,
                "reservedCard": None
            }
            for player in players
        },
        "tokens": {
            "wild": 5,
            "white": 4,
            "blue": 4,
            "red": 4,
            "green": 4,
            "yellow": 4
        },
        "available_cards": {
            "level1": [deck1.pop() for _ in range(4)],
            "level2": [deck2.pop() for _ in range(4)],
            "level3": [deck3.pop() for _ in range(4)],
        },
        "decks": {
            "level1": deck1,
            "level2": deck2,
            "level3": deck3
        },
        "current_turn": players[0],
        "turn_order": players,
        "game_over": False
    }

def affordability(card_row, player_tokens, permanent_gems):
    spend = {c: 0 for c in COLORS}
    wild_needed = 0

    for c in COLORS:
        price = card_row["tokenPrice"].get(c, 0)
        discount = permanent_gems.get(c, 0)
        net_cost = max(0, price - discount)

        use_colour = min(player_tokens.get(c, 0), net_cost)
        spend[c] = use_colour
        shortfall = net_cost - use_colour
        wild_needed += shortfall

    has_wilds = player_tokens.get("wild", 0) >= wild_needed
    return has_wilds, spend, wild_needed

@app.route('/game', methods=['POST'])
def get_game_state():
    # Get the JSON data from the request
    data = request.get_json()
    
    # Extract lobby code and player ID
    lobby_code = data.get("lobbyCode")
    player_id = data.get("playerID")

    print(f"Received lobby code: {lobby_code}")
    # print(f"all lobby codes: {game_states}")
    # Check if lobby code is provided and exists in game states
    if not lobby_code or lobby_code not in game_states:
        return jsonify({"error": "Invalid lobby code"}), 400

    # Check if player ID is provided and is part of the game
    game = game_states[lobby_code]
    if not player_id or player_id not in game["players"]:
        return jsonify({"error": "Player not part of this game"}), 403

    # Return the game state if everything is valid
    return jsonify(game)

@app.route('/game/move', methods=['POST'])
def make_move():
    data = request.get_json()
    action = data.get("action")
    lobby_code = data.get("lobbyCode")
    player = data.get("player")

    # Basic validation
    if not lobby_code or lobby_code not in game_states:
        return jsonify({"error": "Invalid lobby code"}), 400
    if not player or player not in game_states[lobby_code]["players"]:
        return jsonify({"error": "Invalid player"}), 400

    state = game_states[lobby_code]
    player_state = state["players"][player]

    if state["current_turn"] != player:
        return jsonify({"error": "Not your turn"}), 403

    handlers = {
        "take_tokens": handle_take_tokens,
        "play_card": handle_play_card,
        "reserve_card": handle_reserve_card,
    }

    handler = handlers.get(action)
    if handler:
        result = handler(state, player_state, data)
    else:
        return jsonify({"error": "Unknown action"}), 400

    # Check for win condition
    if player_state["points"] >= 15:
        state["game_over"] = True

    # Advance turn
    turn_order = state["turn_order"]
    current_index = turn_order.index(state["current_turn"])
    state["current_turn"] = turn_order[(current_index + 1) % len(turn_order)]

    update_clients(lobby_code)
    return jsonify(state)

def handle_take_tokens(state, player_state, data):
    tokens_requested = data.get("tokens", {})
    for token, count in tokens_requested.items():
        if state["tokens"].get(token, 0) < count:
            raise ValueError(f"Not enough {token} tokens available")

    for token, count in tokens_requested.items():
        state["tokens"][token] -= count
        player_state["tokens"][token] += count

    return state


def handle_play_card(state, player_state, data):
    card_id = data.get("cardId")
    if not card_id or card_id not in ALL_CARDS:
        raise ValueError("Invalid cardId")

    card = ALL_CARDS[card_id]
    can_buy, spend_colour, wild_needed = affordability(
        card, player_state["tokens"], player_state["permanentGems"]
    )

    if not can_buy:
        raise ValueError("Not enough tokens (including wilds)")

    # Pay tokens
    for color, amt in spend_colour.items():
        player_state["tokens"][color] -= amt
        state["tokens"][color] += amt
    player_state["tokens"]["wild"] -= wild_needed
    state["tokens"]["wild"] += wild_needed

    # Gain bonuses
    player_state["permanentGems"][card["color"]] += 1
    player_state["points"] += card["points"]

    # Remove from board or reserved
    is_reserved = player_state.get("reservedCard") and player_state["reservedCard"].get("id") == card_id
    if is_reserved:
        player_state["reservedCard"] = None
    else:
        remove_card_from_board(state, card_id)

    return state


def handle_reserve_card(state, player_state, data):
    card_id = data.get("cardId")
    if not card_id or card_id not in ALL_CARDS:
        raise ValueError("Invalid cardId")

    if player_state["reservedCard"] is None:
        player_state["reservedCard"] = ALL_CARDS[card_id]
        remove_card_from_board(state, card_id)

        # Give wild token if available
        if state["tokens"]["wild"] > 0:
            player_state["tokens"]["wild"] += 1
            state["tokens"]["wild"] -= 1

    return state

def remove_card_from_board(state, card_id):
    for level in ["level1", "level2", "level3"]:
        available = state["available_cards"][level]
        for i, card in enumerate(available):
            if card["id"] == card_id:
                del available[i]
                if state["decks"][level]:
                    new_card = state["decks"][level].pop()
                    available.insert(i, new_card)
                return
 
@app.route('/game/check_affordability', methods=['POST'])
def check_affordability():
    data = request.get_json()
    lobby_code = data.get("lobbyCode", "").strip().upper()
    player = data.get("player")  # This is the player's username or ID
    card_id = data.get("cardId")

    # Validate lobby and player
    if not lobby_code or lobby_code not in game_states:
        return jsonify({"error": "Invalid lobby code"}), 400

    if not player or player not in game_states[lobby_code]["players"]:
        return jsonify({"error": "Invalid player"}), 400

    if not card_id or card_id not in ALL_CARDS:
        return jsonify({"error": "Invalid cardId"}), 400

    card = ALL_CARDS[card_id]
    player_state = game_states[lobby_code]["players"][player]
    can_buy, spend_colour, wild_needed = affordability(
        card,
        player_state["tokens"],
        player_state["permanentGems"]
    )

    return jsonify({"can_buy": can_buy, "spend_colour": spend_colour, "wild_needed": wild_needed})

# JACKS LOBBY STUFF

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

def update_clients(lobby_code):
    socketio.emit('game_state', game_states[lobby_code], room=lobby_code)
    state = game_states[lobby_code]
    socketio.emit("game_update", state, room=lobby_code)

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
    photo_url = data.get("photoURL", "/images/default_pfp.jpg")
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
    user_lobby_map[request.sid + "_photoURL"] = photo_url

    print(f"🙋‍♂️ {username} joined lobby {lobby_code}")

    emit("lobby_joined", {"lobbyCode": lobby_code}, to=request.sid)
    emit("lobby_info", {"players": lobbies[lobby_code]}, room=lobby_code)
    emit("lobby_info", {"players": lobbies[lobby_code]}, to=request.sid)

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
    photo_url = data.get("photoURL", "/images/default_pfp.jpg")

    print("🎯 received ready_up:", data)  # ✅ this MUST print if it's working

    if not lobby_code or lobby_code not in lobbies or not username:
        print("🚫 Invalid ready_up request.")
        return

    # Initialize if not already
    if lobby_code not in ready_players:
        ready_players[lobby_code] = set()

    ready_players[lobby_code].add(username)

    print(f"lobbies: {set(lobbies[lobby_code])} and ready_players: {set(ready_players[lobby_code])} should be the same")
    if set(lobbies[lobby_code]) == set(ready_players[lobby_code]):
        if len(ready_players[lobby_code]) >= 2:
            game_states[lobby_code] = initialize_game_state(lobbies[lobby_code])
            for sid_key, name in user_lobby_map.items():
                if sid_key.endswith("_name") and user_lobby_map[sid_key] in lobbies[lobby_code]:
                    sid = sid_key[:-5]
                    player_name = user_lobby_map[sid_key]
                    player_photo = user_lobby_map.get(sid + "_photoURL", "/images/default_pfp.jpg")
                    game_states[lobby_code]["players"][player_name]["photoURL"] = player_photo
            print(f"lobby added to game_states {game_states[lobby_code]}")
            emit("game_started", {"lobbyCode": lobby_code}, room=lobby_code)
            del ready_players[lobby_code]
    emit("ready_status", {
        "readyPlayers": list(ready_players.get(lobby_code, set())),
        "totalPlayers": lobbies.get(lobby_code, []),
    }, room=lobby_code)


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
    
    

# # --- Run ---
if __name__ == "__main__":
    socketio.run(app, host='0.0.0.0', port=4000, debug=True)



# # if __name__ == '__main__':
# #     app.run(debug=True)