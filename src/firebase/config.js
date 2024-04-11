// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDeoZ1EpcN_DhxZG0Sgtjf4idDjGZhZl4c",
  authDomain: "reflejos-d3e62.firebaseapp.com",
  projectId: "reflejos-d3e62",
  storageBucket: "reflejos-d3e62.appspot.com",
  messagingSenderId: "769157378948",
  appId: "1:769157378948:web:de8c785c6f3d936331e3d1",
  measurementId: "G-9YG59TQ632"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);