from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, send

app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'

cors = CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)  # Enable CORS for all routes
socketio = SocketIO(app, cors_allowed_origins="http://localhost:3000")  # Allow React origin specifically

# @app.route("/")
# def home():
#     return jsonify({"message": "Flask WebSocket server is running!"})

@socketio.on("connect")
def handle_connect():
    print("Client connected!")
    send("Welcome to the WebSocket server!", broadcast=True)

@socketio.on("custom_event")
def handle_custom_event(data):
    print(f"Received from frontend: {data}")
    send(f"Backend received: {data}", broadcast=True)

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=4000)