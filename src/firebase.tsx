import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyCRFGW_lsuYduVBp3RsMdnTkdLlWP69CvQ",
  authDomain: "pg-gamification.firebaseapp.com",
  databaseURL: "https://pg-gamification.firebaseio.com",
  projectId: "pg-gamification",
  storageBucket: "pg-gamification.appspot.com",
  messagingSenderId: "159004737280",
  appId: "1:159004737280:web:b2285ca084ec9158997de5"
});

export { firebaseConfig as firebase };
