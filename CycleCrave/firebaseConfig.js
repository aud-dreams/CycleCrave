// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getDatabase } from 'firebase/database'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getDatabase(app)

// const analytics = getAnalytics(app)
