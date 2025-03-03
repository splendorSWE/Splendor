import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyBvaHi_soL2kocOj4K8rdoXSzX1R8c9FD0",
  authDomain: "spledorswe.firebaseapp.com",
  projectId: "spledorswe",
  storageBucket: "spledorswe.firebasestorage.app",
  messagingSenderId: "284816713135",
  appId: "1:284816713135:web:97f208e68b75b053e27b5a",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };