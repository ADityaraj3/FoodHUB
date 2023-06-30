// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore}  from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_BCeLlT2-koafaVlx5ABmjvPID7xCtOs",
  authDomain: "blogproject-6e33a.firebaseapp.com",
  projectId: "blogproject-6e33a",
  storageBucket: "blogproject-6e33a.appspot.com",
  messagingSenderId: "984775387579",
  appId: "1:984775387579:web:e72258d98cfa0c6e5dfc9e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider  = new GoogleAuthProvider();
export const db = getFirestore(app);