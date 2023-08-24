import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-app.js'

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js';
import {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  orderBy,
  serverTimestamp,
  getDocs,
  onSnapshot,
  deleteDoc,
  query,
  where,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyAZr_Cl0cck7humaigjk5AR5X0F3jRiBXk",
  authDomain: "bloggingapp-ed9fa.firebaseapp.com",
  projectId: "bloggingapp-ed9fa",
  storageBucket: "bloggingapp-ed9fa.appspot.com",
  messagingSenderId: "517586727403",
  appId: "1:517586727403:web:48a05893fca3b2c22069ae"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  collection,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  signOut,
  doc,
  onSnapshot,
  onAuthStateChanged,
  deleteDoc,
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  query,
  orderBy,
  serverTimestamp,
  auth,
  db,
  where,
  updateDoc,
  arrayRemove,
  arrayUnion,
};







