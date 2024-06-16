// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPiLuHPGyV3vq3zRsRY4OH2PKAN9yvr18",
  authDomain: "post-up-blog.firebaseapp.com",
  projectId: "post-up-blog",
  storageBucket: "post-up-blog.appspot.com",
  messagingSenderId: "463811117326",
  appId: "1:463811117326:web:2738ca95cd4832915f975f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//export storage, db, and auth for firebase functionalities
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth =getAuth(app);