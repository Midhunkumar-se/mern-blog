// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-1af0c.firebaseapp.com",
  projectId: "mern-blog-1af0c",
  storageBucket: "mern-blog-1af0c.appspot.com",
  messagingSenderId: "29497091665",
  appId: "1:29497091665:web:0e3b10ddf0771b81697a70",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
