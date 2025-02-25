from flask import Blueprint, request, jsonify
from .services.user_service import create_user
from .models import User




user_routes = Blueprint("user_routes", __name__)



@user_routes.route("/create-user", methods=["POST"])
def create_user_route():
    data = request.json
    user = User(
        user_id=data["user_id"],
        name=data["name"],
        email=data["email"],
        profile_image=data.get("profile_image"),  # Optional field
    )
    create_user(user)
    return jsonify({"message": "User created successfully"}), 201