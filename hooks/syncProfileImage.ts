import { db } from "@/firebase/firebase.config";
import { Post } from "@/types/PostTypes";
import { doc, DocumentData, updateDoc } from "firebase/firestore";
import { useCallback } from "react";
import { Alert } from "react-native";

function useSyncProfileImage(userDoc: DocumentData | null | undefined, firstPost: Post) {
  const syncProfileImage = useCallback(async () => {
    if (!userDoc?.uid) return;
    if (userDoc.image) return; // already has image
    if (!firstPost?.postedBy?.image) return; // no usable image found

    try {
      await updateDoc(doc(db, "users", userDoc.uid), {
        image: firstPost.postedBy.image,
      });
    } catch (err: any) {
      Alert.alert("Error", `Failed to sync profile image: ${err.message || "Unknown error"}`);
    }
  }, [userDoc, firstPost]);

  return { syncProfileImage };
}

export default useSyncProfileImage;
