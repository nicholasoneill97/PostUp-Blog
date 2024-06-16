// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBh4GZDCNZ7quYwhGsC2rBn8GXXZ9fxNoA",
  authDomain: "anime-blog-863d1.firebaseapp.com",
  projectId: "anime-blog-863d1",
  storageBucket: "anime-blog-863d1.appspot.com",
  messagingSenderId: "797848633239",
  appId: "1:797848633239:web:93648cdab4715546b6ced2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//export storage, db, and auth for firebase functionalities
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth =getAuth(app);