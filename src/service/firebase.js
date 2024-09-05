import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: `${import.meta.env.VITE_APP_API_KEY}`, // para Vite
    authDomain: "tp1-cmw.firebaseapp.com",
    projectId: "tp1-cmw",
    storageBucket: "tp1-cmw.appspot.com",
    messagingSenderId: "1078652927789",
    appId: `${import.meta.env.VITE_APP_APP_ID}` // para Vite
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

