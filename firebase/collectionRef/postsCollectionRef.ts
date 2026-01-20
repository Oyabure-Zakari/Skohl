import { collection } from "firebase/firestore";
import { db } from "../firebase.config";

// Create a reference to the users collection
const postsCollectionRef = collection(db, "posts");

export default postsCollectionRef;