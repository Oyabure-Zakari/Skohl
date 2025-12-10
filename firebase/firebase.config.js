import { initializeApp } from "firebase/app";

import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

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

// Stores the user session inside AsyncStorage so that even if the app closes or restarts, the user remains logged in.
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app); // Initialize Cloud Firestore and get a reference to the service
const storage = getStorage(app); // Initialize Cloud Storage and get a reference to the service

export { auth, db, storage };
export default app;
