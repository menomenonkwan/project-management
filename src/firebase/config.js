import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBDKLVoQb1qlGmDh5GYGqKJ5gKc_jU5i_E",
  authDomain: "projectmanager-59559.firebaseapp.com",
  projectId: "projectmanager-59559",
  storageBucket: "projectmanager-59559.appspot.com",
  messagingSenderId: "560516311764",
  appId: "1:560516311764:web:d54ee70e3969242be82941"
};

// initialize app
initializeApp(firebaseConfig);

// initialize firebase auth
const auth = getAuth();

// initialize firestore database
const db = getFirestore();

// initialize firebase cloud storage
const storage = getStorage();

export { auth, db, storage }