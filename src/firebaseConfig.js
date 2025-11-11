import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc,getDocs ,getDoc,doc, updateDoc} from "firebase/firestore";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider 
} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDBnRVCCD_InEDeyvOBrEyPUQDMyhysf9g",
  authDomain: "datricon-b3925.firebaseapp.com",
  projectId: "datricon-b3925",
  storageBucket: "datricon-b3925.firebasestorage.app",
  messagingSenderId: "4875703574",
  appId: "1:4875703574:web:f4d3ef0b24980d0324ac37",
  measurementId: "G-1BHG3SFZWK"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export {
  db,
  addDoc,
  getDocs,
  getDoc,
  collection,
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  doc, updateDoc,googleProvider,
};
