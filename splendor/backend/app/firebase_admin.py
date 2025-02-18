import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("splendor/backend/spledorswe-firebase-adminsdk-fbsvc-a7721c2f3f.json")
firebase_admin.initialize_app(cred)

db = firestore.client()