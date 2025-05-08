import pyrebase

firebaseConfig = {
  'apiKey': "AIzaSyBvaHi_soL2kocOj4K8rdoXSzX1R8c9FD0",
  'authDomain': "spledorswe.firebaseapp.com",
  'projectId': "spledorswe",
  'storageBucket': "spledorswe.firebasestorage.app",
  'messagingSenderId': "284816713135",
  'appId': "1:284816713135:web:97f208e68b75b053e27b5a",
  'databaseURL' : 'https://spledorswe-default-rtdb.firebaseio.com/',
  "serviceAccount": "./key.json"
}

firebase = pyrebase.initialize_app(firebaseConfig)
auth = firebase.auth()
db = firebase.database()
