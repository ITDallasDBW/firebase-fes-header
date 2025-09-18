// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkxsvpirCZIW6nqPiSGkpm7NP__4hVRDM",
  authDomain: "fir-fes-header.firebaseapp.com",
  projectId: "fir-fes-header",
  storageBucket: "fir-fes-header.firebasestorage.app",
  messagingSenderId: "634129251039",
  appId: "1:634129251039:web:59b872eca6e01c143fc76a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();