import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";

const removeFromBookmarks = async (postId: string) => {
  try {
    // Delete bookmark from firestore
    await deleteDoc(doc(db, "bookmarks", postId));
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default removeFromBookmarks;
