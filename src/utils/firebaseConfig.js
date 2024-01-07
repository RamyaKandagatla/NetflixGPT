// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA8BK9zALJpTDthSyOFhjZOuq1iM8qaC8k",
  authDomain: "netflixgpt-befcf.firebaseapp.com",
  projectId: "netflixgpt-befcf",
  storageBucket: "netflixgpt-befcf.appspot.com",
  messagingSenderId: "787182452415",
  appId: "1:787182452415:web:fdb1a92621bea4edaed00a",
  measurementId: "G-J0X8X77MPK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
