import { collection } from "firebase/firestore";
import { db } from "../firebase.config";

// Create a reference to the users collection
const usersCollectionRef = collection(db, "users");

export default usersCollectionRef;
