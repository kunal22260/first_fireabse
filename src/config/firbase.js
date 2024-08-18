// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0yUsN5mOCk-i3GXvx5nwcZIbYvCg2I4s",
  authDomain: "firbase-first-79be5.firebaseapp.com",
  projectId: "firbase-first-79be5",
  storageBucket: "firbase-first-79be5.appspot.com",
  messagingSenderId: "985161398888",
  appId: "1:985161398888:web:d26fa34678c4eebca299dd",
  measurementId: "G-8R34PCL1X8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const googleProvider=new GoogleAuthProvider();
export const db=getFirestore(app);
export const storage=getStorage(app);