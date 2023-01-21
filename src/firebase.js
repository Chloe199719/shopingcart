import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAfgHDZjvnBaiDufFKEgtGs1FXw6gkm9SY",
  authDomain: "shop-95bcb.firebaseapp.com",
  projectId: "shop-95bcb",
  storageBucket: "shop-95bcb.appspot.com",
  messagingSenderId: "539715547585",
  appId: "1:539715547585:web:37e933c0721e6cee65ff40",
  measurementId: "G-CV6TMEBPD7",
});

const db = getFirestore(firebaseApp);
const auth = getAuth();

export { db, auth };
