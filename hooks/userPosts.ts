import { ERRORSOUND } from "@/constants/soundConfig";
import postsCollectionRef from "@/firebase/collectionRef/postsCollectionRef";
import { Post } from "@/types/PostTypes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import * as Haptics from "expo-haptics";
import { onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { useWindowDimensions } from "react-native";
import Toast from "react-native-toast-message";
import { usePlaySound } from "./playSound";

export const useUserPosts = (userUid: string | null | undefined) => {
  const { fontScale } = useWindowDimensions();

  const { playSound } = usePlaySound();

  // Gives us access to tanstack query methods
  const queryClient = useQueryClient();

  const {
    data: posts = [],
    isLoading: isLoadingCreatedPosts,
    isError,
    error,
  } = useQuery<Post[]>({
    queryKey: ["userPosts", userUid], // Unique key per user
    enabled: !!userUid, // Don't run if no user
    staleTime: Infinity, // Never consider it stale — onSnapshot keeps it fresh
    gcTime: 1000 * 60 * 5, // Keep in cache 5 min after unmount
    queryFn: () => {
      // This is a placeholder — we never actually "fetch" here
      return Promise.resolve([]); // Its going to return a promise array
    },
  });

  // Real-time listener runs once per userUid change, listens for changes in posts collection (add/update/delete)
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
      orderBy("createdAt", "desc"),
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
      (error: any) => {
        // Plays error sound
        playSound(ERRORSOUND);

        // Haptic  feedback
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

        // Toast notification
        Toast.show({
          type: "error",
          text1: "Failed to load posts",
          text2: error?.message,
          text1Style: { fontSize: fontScale * 16, fontFamily: "Segoe_UI_Bold" },
          text2Style: { fontSize: fontScale * 12, fontFamily: "Segoe_UI_Bold" },
        });
      },
    );

    return () => unsubscribe();
  }, [userUid]);

  return {
    posts,
    isLoadingCreatedPosts,
    isError,
    error,
  };
};
