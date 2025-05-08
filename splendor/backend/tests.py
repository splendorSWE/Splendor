import pytest # pip3 install pytest
from flask import Flask, jsonify
from flask_socketio import SocketIO, emit, join_room, leave_room
from run_multiplayer import app, initialize_game_state, affordability, game_states

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client

# Test initialize_game_state
def test_initialize_game_state():
    players = ['player1', 'player2']
    state = initialize_game_state(players)

    assert len(state['players']) == 2
    assert set(state['players'].keys()) == set(players)
    assert state['tokens']['wild'] == 5

# Test affordability function
def test_affordability():
    card = {"tokenPrice": {"red": 3, "green": 2}}
    player_tokens = {"red": 2, "green": 2, "wild": 1}
    permanent_gems = {"red": 1, "green": 0}

    can_buy, spend, wild_needed = affordability(card, player_tokens, permanent_gems)

    assert can_buy is True
    assert spend == {"red": 2, "green": 2, "blue": 0, "yellow": 0, "white": 0}
    assert wild_needed == 0

# Test /game endpoint
def test_get_game_state(client):
    game_states['ABC123'] = initialize_game_state(['player1', 'player2'])

    response = client.post('/game', json={"lobbyCode": "ABC123", "playerID": "player1"})
    assert response.status_code == 200

# Test /game/move - take_tokens
def test_take_tokens(client):
    game_states['ABC123'] = initialize_game_state(['player1', 'player2'])

    response = client.post('/game/move', json={
        "lobbyCode": "ABC123",
        "player": "player1",
        "action": "take_tokens",
        "tokens": {"red": 1, "green": 1}
    })

    assert response.status_code == 200
    data = response.get_json()
    assert data['players']['player1']['tokens']['red'] == 1
    assert data['players']['player1']['tokens']['green'] == 1

# Test /game/move - invalid action
def test_invalid_action(client):
    game_states['ABC123'] = initialize_game_state(['player1', 'player2'])

    response = client.post('/game/move', json={
        "lobbyCode": "ABC123",
        "player": "player1",
        "action": "invalid_action"
    })

    assert response.status_code == 400

# Test /game/check_affordability
def test_check_affordability(client):
    game_states['ABC123'] = initialize_game_state(['player1', 'player2'])

    response = client.post('/game/check_affordability', json={
        "lobbyCode": "ABC123",
        "player": "player1",
        "cardId": "card1"
    })

    assert response.status_code == 400  # because card1 is not in ALL_CARDS
