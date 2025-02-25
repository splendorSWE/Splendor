# backend/app/services/user_service.py
from .firebase_admin import db
from .models import User

def create_user(user: User):
    try:
        # Add the user to the 'users' collection
        user_ref = db.collection("users").document(user.user_id)
        user_ref.set(user.to_dict())
        print(f"User {user.user_id} created successfully.")
    except Exception as e:
        print(f"Error creating user: {e}")