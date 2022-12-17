// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA51mXoqHBD-CU2w71_0REU8l3OSOCxiXo",
  authDomain: "pokedex-45ff3.firebaseapp.com",
  projectId: "pokedex-45ff3",
  storageBucket: "pokedex-45ff3.appspot.com",
  messagingSenderId: "11988094571",
  appId: "1:11988094571:web:c89d46ece783ce6ffdeb2e",
  measurementId: "G-KK62K1WH5T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth();
