import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkFYV1zdnfHN1jEtk-vXQ-wz76D7DDDFs",
  authDomain: "skohl-8e61e.firebaseapp.com",
  projectId: "skohl-8e61e",
  storageBucket: "skohl-8e61e.firebasestorage.app",
  messagingSenderId: "348604548608",
  appId: "1:348604548608:web:0d10f60302f866f475bae5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app); // Initialize Firebase Authentication and get a reference to the service
export const db = getFirestore(app); // Initialize Cloud Firestore and get a reference to the service
export const storage = getStorage(app); // Initialize Cloud Storage and get a reference to the service
