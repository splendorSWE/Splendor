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

# temporary game state to mimic what we have on the screen right now
game_state = {
    "points": 10,
    "tokens": {
        "wild": 3,
        "white": 3,
        "blue": 3,
        "red": 3,
        "green": 3,
        "yellow": 3
    },
    "playerTokens": {
        "wild": 0,
        "white": 0,
        "blue": 0,
        "red": 0,
        "green": 0,
        "yellow": 0
    },
    "cards": {},
    "players":{}
}

@app.route('/game', methods=['GET'])
def get_game_state():
    return jsonify(game_state)

@app.route('/game/move', methods=['POST'])
def make_move(player=None):
    data = request.get_json()
    action = data.get("action")
    
    if action == "take_tokens":
        tokens_requested = data.get("tokens")

        for token, count in tokens_requested.items():
            available = game_state["tokens"].get(token, 0)
            if available < count:
                return jsonify({"error": f"Not enough {token} tokens available"}), 400

        for token, count in tokens_requested.items():
            game_state["tokens"][token] -= count
            game_state["playerTokens"][token] += count
        return jsonify(game_state)
    
    return jsonify({"error": "Invalid action"}), 400

# @app.route('/game/move', methods=['POST'])
# def make_move(player=None):
#     data = request.get_json()
#     action = data.get("action")
    
#     if action == "take_tokens":
#         tokens_requested = data.get("tokens")
#         for token, count in tokens_requested.items():
#             available = game_state["tokens"].get(token, 0)
#             if available < count:
#                 return jsonify({"error": f"Not enough {token} tokens available"}), 400
#         for token, count in tokens_requested.items():
#             game_state["tokens"][token] -= count
#         return jsonify(game_state)
    
#     # can either add other actions in different if statements or could create a seperate function for each type of move.
    
#     return jsonify({"error": "Invalid action"}), 400

socketio = SocketIO(app, cors_allowed_origins="*")

@socketio.on('connect')
def handle_connect():
    emit('game_state', game_state)

def update_clients():
    socketio.emit('game_state', game_state)

if __name__ == '__main__':
    app.run(debug=True)