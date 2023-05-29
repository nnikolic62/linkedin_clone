import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDxi6QHNvT32pI9kijz5tXS0C3K44oEDzY",
  authDomain: "linkedin-clone-ed546.firebaseapp.com",
  projectId: "linkedin-clone-ed546",
  storageBucket: "linkedin-clone-ed546.appspot.com",
  messagingSenderId: "972557953063",
  appId: "1:972557953063:web:393a22f3440f691c128602",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
