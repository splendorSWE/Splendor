
import { useEffect, useState } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, signInAnonymously, updateProfile } from "firebase/auth";
import { getDatabase, ref, get, set } from "firebase/database";

import {getDownloadURL, getStorage, uploadBytes} from "firebase/storage";
import { updatePassword as firebaseUpdatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBvaHi_soL2kocOj4K8rdoXSzX1R8c9FD0",
  authDomain: "spledorswe.firebaseapp.com",
  projectId: "spledorswe",
  storageBucket: "spledorswe.firebasestorage.app",
  messagingSenderId: "284816713135",
  appId: "1:284816713135:web:97f208e68b75b053e27b5a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const storage = getStorage(app);

export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}


export async function loginGuest() {
  console.log("logging guest in");
  const result = await signInAnonymously(auth);
  const user = result.user;

  try {
    const userRef = ref(db, "users/" + user.uid);
    const snapshot = await get(userRef);

    if (!snapshot.exists()) {
      const randomNumber = Math.floor(1000 + Math.random() * 9000);
      const guestName = `Guest-${randomNumber}`;

      await set(userRef, {
        username: guestName,
        createdAt: new Date().toISOString(),
        wins: 0,
      });
      console.log("guestName =", guestName);
    } else {
      console.log("guest already has username");
    }
  } catch (err) {
    console.error("🔥 Error in loginGuest DB access:", err);
  }

  return result;
}

export function logout() {
  return signOut(auth);
}

export async function updatePassword(user, credential, newPassword) {
    await reauthenticateWithCredential(user, credential);         
    await firebaseUpdatePassword(user, newPassword);
}

export function emailAuthProvider(email, password) {
  return EmailAuthProvider.credential(email, password);
}

// Custom Hook
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub; // Clean up subscription on unmount
  }, [auth]); // Dependency array added for auth

  return currentUser;
}
export async function uploadPfP(file, user, setLoading) {
    const fileRef =ref(storage, user.uid + '.png');
  
    setLoading(true);
    const snapshot = await uploadBytes(fileRef, file);
    
    const photoURL = await getDownloadURL(fileRef);
    updateProfile(user, {photoURL});
    setLoading(false);
    alert("Uploaded file!");
    
  
  }

export {db, storage, auth}