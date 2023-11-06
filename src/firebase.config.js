// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAr5ntI_hWiqqsVgs_m35cyzosHh8iElIk",
  authDomain: "ajoobaexperience.firebaseapp.com",
  projectId: "ajoobaexperience",
  storageBucket: "ajoobaexperience.appspot.com",
  messagingSenderId: "844129399488",
  appId: "1:844129399488:web:ca72051d57e7484262b325",
  measurementId: "G-LZETD4NKD5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);

const usersCollectionRef = collection(db, "users");

