import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyArREEIIcSGXOjzn1JzCOxbenXt2swhqaQ",
  authDomain: "pldd-9f621.firebaseapp.com",
  projectId: "pldd-9f621",
  storageBucket: "pldd-9f621.appspot.com",  
  messagingSenderId: "312072106114",
  appId: "1:312072106114:web:36a89a2658971a4cd2049b",
  measurementId: "G-JQJ8C7QHT1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // 🔹 Added Firebase Authentication
