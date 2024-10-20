// src/firebase.js
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyANvbkAgRJ65xLq-4vKZWm1Rpm1aTiBz3A",
    authDomain: "moviebook-9ff3c.firebaseapp.com",
    projectId: "moviebook-9ff3c",
    storageBucket: "moviebook-9ff3c.appspot.com",
    messagingSenderId: "679162921527",
    appId: "1:679162921527:web:a6d86be3e05291c13eb5b2",
    measurementId: "G-KHNTQQ6HS5",
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app,auth};

export default getFirestore();
