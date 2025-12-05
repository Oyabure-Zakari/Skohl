import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app); // Initialize Firebase Authentication and get a reference to the service
const db = getFirestore(app); // Initialize Cloud Firestore and get a reference to the service
const storage = getStorage(app); // Initialize Cloud Storage and get a reference to the service

export { auth, db, storage };
export default app;
