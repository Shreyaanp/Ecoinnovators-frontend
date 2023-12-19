
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAfvmVeoAqdLml3DaVnVTZsFEgp7dRXWEA",
  authDomain: "sih-ecoinnovators.firebaseapp.com",
  databaseURL: "https://sih-ecoinnovators-default-rtdb.firebaseio.com",
  projectId: "sih-ecoinnovators",
  storageBucket: "sih-ecoinnovators.appspot.com",
  messagingSenderId: "1037454177507",
  appId: "1:1037454177507:web:b8ddb2ae3eb8cbd2d5c1d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);
const db = getDatabase(app)
export const googleProvider = new GoogleAuthProvider();

export {db, auth, database};