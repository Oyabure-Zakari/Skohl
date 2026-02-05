import postsCollectionRef from "@/firebase/collectionRef/postsCollectionRef";
import { ProductPost } from "@/types/PostTypes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { useWindowDimensions } from "react-native";
import Toast from "react-native-toast-message";

export const useFetchPosts = (activeProductCategory: string) => {
  const { fontScale } = useWindowDimensions();

  // Gives us access to tanstack query methods
  const queryClient = useQueryClient();

  const {
    data: posts = [],
    isLoading: isLoadingPosts,
    isError,
    error,
  } = useQuery<ProductPost[]>({
    queryKey: ["productPosts", activeProductCategory], // Unique key per category
    enabled: !!activeProductCategory, // Don't run if no category
    staleTime: Infinity, // Never consider it stale — onSnapshot keeps it fresh
    gcTime: 1000 * 60 * 5, // Keep in cache 5 min after unmount
    queryFn: () => {
      // This is a placeholder — we never actually "fetch" here
      return Promise.resolve([]); // Its going to return a promise array
    },
  });

  // Real-time listener runs once per activeProductCategory change, listens for changes in posts collection (add/update/delete)
  useEffect(() => {
    // If no category, clear cache
    if (!activeProductCategory) {
      // Clear cache
      queryClient.setQueryData(["productPosts", activeProductCategory], []);
      return;
    }

    // Fetch posts
    let q;
    if (activeProductCategory === "none") {
      // All products
      q = query(
        postsCollectionRef,
        where("postType", "==", "product"),
        orderBy("createdAt", "desc"),
      );
    } else {
      // Filtered by category
      q = query(
        postsCollectionRef,
        where("postType", "==", "product"),
        where("category", "==", activeProductCategory),
        orderBy("createdAt", "desc"),
      );
    }

    // Real-time listener, listens for changes in posts collection (add/update/delete)
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedPosts: ProductPost[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as ProductPost[];

        // setQueryData will update TanStack Query's cache with the fresh data from Firestore
        queryClient.setQueryData(["productPosts", activeProductCategory], fetchedPosts);
      },
      (error) => {
        console.error("Product posts real-time error:", error);
        Toast.show({
          type: "error",
          text1: "Error fetching posts",
          text2: error.message || "An error occurred while fetching posts.",
          text1Style: { fontSize: fontScale * 16, fontFamily: "Segoe_UI_Bold" },
          text2Style: { fontSize: fontScale * 12, fontFamily: "Segoe_UI_Bold" },
        });
      },
    );

    return () => unsubscribe();
  }, [activeProductCategory]);

  return {
    posts,
    isLoadingPosts,
    isError,
    error,
  };
};
