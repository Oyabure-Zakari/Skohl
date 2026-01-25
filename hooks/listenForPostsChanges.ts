import postsCollectionRef from "@/firebase/collectionRef/postsCollectionRef";
import { Post } from "@/types/PostTypes";
import { useQueryClient } from "@tanstack/react-query";
import { onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect } from "react";
import Toast from "react-native-toast-message";

export const useListenForPostsChanges = (userUid: string | null) => {
    // TanStack Query client
  const queryClient = useQueryClient();

    useEffect(() => {
      // If no userUid, clear cache
      if (!userUid) {
        // Clear cache
        queryClient.setQueryData(["userPosts", userUid], []);
        return;
      }
  
      // Fetch user's posts
      const q = query(
        postsCollectionRef,
        where("postedBy.userUid", "==", userUid),
        orderBy("createdAt", "desc")
      );
  
      // Real-time listener, listens for changes in posts collection (add/update/delete)
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const fetchedPosts: Post[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })) as Post[];
  
          // setQueryData will update TanStack Query's cache with the fresh data from Firestore
          queryClient.setQueryData(["userPosts", userUid], fetchedPosts);
        },
        (error) => {
          console.error("Posts real-time error:", error);
          Toast.show({
            type: "error",
            text1: "Failed to load posts",
            text2: error.message,
          });
        }
      );
  
      return () => unsubscribe();
    }, [userUid]);
};