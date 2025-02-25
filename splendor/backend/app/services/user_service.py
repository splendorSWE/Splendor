# backend/app/services/user_service.py
from firebase_admin import db
from ..models import User
from firebase_auth import auth, db


def create_user(user: User):

  
    email = "test@gmail.com"
    password = 'testPass'

    # Log the user in
    try:
        user = auth.create_user_with_email_and_password(email, password)
        results = db.child("users").push(data, user['idToken'])
        print("successfully added user")
    except:
        print("email already exists.")

    # data to save
    data = {
            "name": "Jack Test LaVergne"
        }
    
    users = db.child("users").get()
    print(users.val(), results)