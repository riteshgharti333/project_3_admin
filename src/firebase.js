import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

console.log(import.meta.env.VITE_FIREBASE_API_KEY)

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "project3-f1059.firebaseapp.com",
  projectId: "project3-f1059",
  storageBucket: "project3-f1059.appspot.com",
  messagingSenderId: "411253024294",
  appId: "1:411253024294:web:51fd44b5d9680d609f28e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app)
