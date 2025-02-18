import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore'
import {getAuth, connectAuthEmulator, signInWithEmailAndPassword} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBvaHi_soL2kocOj4K8rdoXSzX1R8c9FD0",
  authDomain: "spledorswe.firebaseapp.com",
  projectId: "spledorswe",
  storageBucket: "spledorswe.firebasestorage.app",
  messagingSenderId: "284816713135",
  appId: "1:284816713135:web:97f208e68b75b053e27b5a"
};

const auth = getAuth(firebaseConfig)
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
connectAuthEmulator(auth)