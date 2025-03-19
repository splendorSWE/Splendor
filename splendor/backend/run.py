# needed installations
    # pip3 install flask
    # pip3 install flask_cors
    # pip3 install flask_socketio
    # to run it (if you're in the splendor directory) ---> python3 backend/run.py

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit


app = Flask(__name__)
CORS(app)

game_state = {
    "points": 10,
    "tokens": {
        "wild": 3,
        "white": 1,
        "blue": 2,
        "red": 1,
        "green": 2,
        "yellow": 2
    },
    "cards": {},
    "players":{}
}

@app.route('/game', methods=['GET'])
def get_game_state():
    return jsonify(game_state)

@app.route('/game/move', methods=['POST'])
def make_move():
    """
    Process a game move. For example, an action like:
    {
        "action": "take_tokens",
        "tokens": {"blue": 1, "red": 1}
    }
    """
    data = request.get_json()
    action = data.get("action")
    
    if action == "take_tokens":
        tokens_requested = data.get("tokens")
        # Simple validation: Check if there are enough tokens available
        for token, count in tokens_requested.items():
            available = game_state["tokens"].get(token, 0)
            if available < count:
                return jsonify({"error": f"Not enough {token} tokens available"}), 400
        # Subtract tokens from the bank (in a real game, update the player's collection too)
        for token, count in tokens_requested.items():
            game_state["tokens"][token] -= count
        return jsonify(game_state)
    
    # Future actions (reserve card, purchase card, etc.) can be handled here.
    return jsonify({"error": "Invalid action"}), 400

socketio = SocketIO(app, cors_allowed_origins="*")

@socketio.on('connect')
def handle_connect():
    emit('game_state', game_state)

def update_clients():
    socketio.emit('game_state', game_state)

if __name__ == '__main__':
    app.run(debug=True)