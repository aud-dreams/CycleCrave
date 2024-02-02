import { initializeApp } from 'firebase/app'

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDUgbWreGJA0ZiYJJQa6n8GAUMRviYLYKc',
  authDomain: 'cyclecrave.firebaseapp.com',
  databaseURL: 'https://cyclecrave-default-rtdb.firebaseio.com',
  projectId: 'cyclecrave',
  storageBucket: 'cyclecrave.appspot.com',
  messagingSenderId: '217712776938',
  appId: '1:217712776938:web:f9643a6df74fbedfa22993',
  measurementId: 'G-J7B6115JW5',
}

export const FIREBASE_APP = initializeApp(firebaseConfig)
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
