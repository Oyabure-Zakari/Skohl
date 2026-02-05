import postsCollectionRef from "@/firebase/collectionRef/postsCollectionRef";
import { Post } from "@/types/PostTypes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { useWindowDimensions } from "react-native";
import Toast from "react-native-toast-message";

export const useFetchPosts = (
  postType: "product" | "service" | "event",
  categoryFilter: string,
) => {
  const { fontScale } = useWindowDimensions();

  // Gives us access to tanstack query methods
  const queryClient = useQueryClient();

  // Unique query key based on postType + optional category
  // const queryKey = categoryFilter
  //   ? [postType, "posts", categoryFilter]
  //   : [postType, "posts"];

  const {
    data: posts = [],
    isLoading: isLoadingPosts,
    isError,
    error,
  } = useQuery<Post[]>({
    queryKey: [postType, "posts", categoryFilter], // Unique key for caching
    staleTime: Infinity, // Never stale — onSnapshot keeps it fresh
    gcTime: 5 * 60 * 1000, // Cache 5 min after unmount
    queryFn: () => Promise.resolve([]), // This is a placeholder — we never actually "fetch" here Its going to return a promise array
  });

  // Real-time listener runs once per categoryFilter change and postType, listens for changes in posts collection (add/update/delete)
  useEffect(() => {
    // Query all posts i.e products, services, or events based on postType
    let q = query(
      postsCollectionRef,
      where("postType", "==", postType),
      orderBy("createdAt", "desc"),
    );

    // Add category filter if provided, query posts by category i.e fashion, electronics etc
    if (categoryFilter && categoryFilter !== "none") {
      q = query(
        postsCollectionRef,
        where("postType", "==", postType),
        where("category", "==", categoryFilter),
        orderBy("createdAt", "desc"),
      );
    }

    // Real-time listener, listens for changes in posts collection (add/update/delete)
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const freshPosts: Post[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Post[];

        // Update TanStack Query cache → UI auto-refreshes
        queryClient.setQueryData([postType, "posts", categoryFilter], freshPosts);
      },
      (err) => {
        console.error(`${postType} posts real-time error:`, err);
        Toast.show({
          type: "error",
          text1: `Failed to load ${postType} posts`,
          text2: err.message || "Check connection",
          text1Style: { fontSize: fontScale * 16, fontFamily: "Segoe_UI_Bold" },
          text2Style: { fontSize: fontScale * 12, fontFamily: "Segoe_UI_Bold" },
        });
      },
    );

    return () => unsubscribe();
  }, [postType, categoryFilter]);

  return {
    posts,
    isLoadingPosts,
    isError,
    error,
  };
};
