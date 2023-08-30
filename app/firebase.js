import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7TduCgW1qIfkfO-WGMrg0MMjFQL1fGhY",
  authDomain: "innovation-seekers-form.firebaseapp.com",
  projectId: "innovation-seekers-form",
  storageBucket: "innovation-seekers-form.appspot.com",
  messagingSenderId: "1005408699540",
  appId: "1:1005408699540:web:775f687370426666542081",
  measurementId: "G-HR93LK0J5J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);

export default db;
