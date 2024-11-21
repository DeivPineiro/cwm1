import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDuAIIL4fJf-L6YgFdthIo5xqLhJWiaDRc", 
    authDomain: "tp1-cmw.firebaseapp.com",
    projectId: "tp1-cmw",
    storageBucket: "tp1-cmw.appspot.com",
    messagingSenderId: "1078652927789",
    appId: "AIzaSyDuAIIL4fJf-L6YgFdthIo5xqLhJWiaDRc" 
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

