import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "" // Your FireStore API_key,
  authDomain: "story-generator-1149a.firebaseapp.com",
  projectId: "story-generator-1149a",
  storageBucket: "story-generator-1149a.appspot.com",
  messagingSenderId: "227293155527",
  appId: "1:227293155527:web:b804674260412f74ffaee2",
  measurementId: "G-7G7C8JTCTZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
