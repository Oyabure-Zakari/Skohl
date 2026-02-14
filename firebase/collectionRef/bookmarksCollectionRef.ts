import { collection } from "firebase/firestore";
import { db } from "../firebase.config";

const bookmarksCollectionRef = collection(db, "bookmarks");

export default bookmarksCollectionRef;
