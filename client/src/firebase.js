// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "traventure-11.firebaseapp.com",
  projectId: "traventure-11",
  storageBucket: "traventure-11.appspot.com",
  messagingSenderId: "314622532632",
  appId: "1:314622532632:web:44b58276912eefe860376d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);