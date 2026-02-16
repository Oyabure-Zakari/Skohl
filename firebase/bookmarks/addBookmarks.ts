import { Post } from "@/types/PostTypes";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase.config";

const addBookmarks = async (postId: string, userUid: string | null, post: Post) => {
  try {
    // Check if postId and userUid exist
    if (!postId) throw new Error("Post not found");
    if (!userUid) throw new Error("User not logged in");
    await setDoc(doc(db, "bookmarks", postId), {
      ...post,
      bookmarkId: postId,
      bookmarkedBy: userUid,
      bookmarkedAt: serverTimestamp(),
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default addBookmarks;
