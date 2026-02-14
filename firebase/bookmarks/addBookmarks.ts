import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase.config";

const addBookmarks = async (postId: string, userUid: string | null) => {
  try {
    // Check if postId and userUid exist
    if (!postId) throw new Error("Post not found");
    if (!userUid) throw new Error("User not logged in");
    await setDoc(doc(db, "bookmarks", postId), {
      bookmarkId: postId,
      bookmarkedBy: userUid,
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default addBookmarks;
