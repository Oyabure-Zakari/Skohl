import postsCollectionRef from "@/firebase/collectionRef/postsCollectionRef";
import { Post } from "@/types/PostTypes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { onSnapshot, query, where } from "firebase/firestore";
import { useEffect } from "react";

export default function usePostDetails(postId: string | null | undefined) {
  // Gives us access to tanstack query methods
  const queryClient = useQueryClient();

  const {
    data: postDetails = {} as Post,
    isLoading: isLoadingPostsDetails,
    isError,
    error,
  } = useQuery<Post>({
    queryKey: ["postDetails", postId], // Unique key per post
    enabled: !!postId, // Don't run if no post ID
    staleTime: Infinity, // Never consider it stale — onSnapshot keeps it fresh
    gcTime: 1000 * 60 * 5, // Keep in cache 5 min after unmount
    queryFn: () => {
      // This is a placeholder — we never actually "fetch" here
      return Promise.resolve({} as Post); // Its going to return a promise which is an object
    },
  });

  // Real-time listener runs once per userUid change, listens for changes in posts collection (add/update/delete)
  useEffect(() => {
    // If no postId, clear cache
    if (!postId) {
      // Clear cache
      queryClient.setQueryData(["postDetails", postId], {});
      return;
    }

    // Fetch post details
    const q = query(postsCollectionRef, where("id", "==", postId));

    // Real-time listener, listens for changes in posts collection (add/update/delete)
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        snapshot.forEach((doc) => {
          queryClient.setQueryData(["postDetails", postId], doc.data() as Post);
        });
      },
      (error) => {
        throw new Error("Error fetching post details", error);
      },
    );

    return () => unsubscribe();
  }, [postId]);

  return {
    postDetails,
    isLoadingPostsDetails,
    isError,
    error,
  };
}
