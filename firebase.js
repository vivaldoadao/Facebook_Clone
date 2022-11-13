import firebase from "./firebase"
import {getApps , initializeApp} from "firebase/app"
import { getFirestore,  } from "firebase/firestore";
import { getStorage  } from "firebase/storage";
import firestore from "firebase/app"
import "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyDtEpU3NVfTv4LdPkmuJLDrnUocD4PV3PA",
    authDomain: "facebook-3d893.firebaseapp.com",
    projectId: "facebook-3d893",
    storageBucket: "facebook-3d893.appspot.com",
    messagingSenderId: "97503005410",
    appId: "1:97503005410:web:edcfc19c96ca2295c52cbb"
  };

  const app = !getApps.length ? initializeApp(firebaseConfig) : firebase.app();
  const  db = getFirestore();
  const storage = getStorage();

  export { db , storage};