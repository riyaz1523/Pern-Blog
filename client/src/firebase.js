// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blog-app-56faf.firebaseapp.com",
  projectId: "blog-app-56faf",
  storageBucket: "blog-app-56faf.appspot.com",
  messagingSenderId: "776870561344",
  appId: "1:776870561344:web:7b0cbe9f97bb0aaf3fc1a5",
  measurementId: "G-76XW1F1E8P"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);