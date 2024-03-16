// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYughDDbiJhNHfIYjcto9HPxDHo6BUX4c",
  authDomain: "reflejos-7fd7b.firebaseapp.com",
  projectId: "reflejos-7fd7b",
  storageBucket: "reflejos-7fd7b.appspot.com",
  messagingSenderId: "827655524996",
  appId: "1:827655524996:web:e89a46d5434e021c3868d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);