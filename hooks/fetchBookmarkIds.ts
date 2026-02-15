import bookmarksCollectionRef from "@/firebase/collectionRef/bookmarksCollectionRef";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { onSnapshot, query, where } from "firebase/firestore";
import { useEffect } from "react";

export default function useFetchBookmarkIds(userUid: string | null) {
  // Gives us access to tanstack query methods
  const queryClient = useQueryClient();

  const {
    data: bookmarkIds = [],
    isLoading: isLoadingBookmarkIds,
    isError: isBookmarkIdsError,
    error: bookmarkIdsError,
  } = useQuery<string[]>({
    queryKey: ["bookmarkIds", userUid],
    enabled: !!userUid, // Don't run if no user ID
    staleTime: Infinity, // Never consider it stale — onSnapshot keeps it fresh
    gcTime: 1000 * 60 * 5, // Keep in cache 5 min after unmount
    queryFn: () => {
      // This is a placeholder — we never actually "fetch" here
      return Promise.resolve([] as string[]); // Its going to return a promise which is an array
    },
  });

  useEffect(() => {
    // If no userUid, clear cache
    if (!userUid) {
      // Clear cache
      queryClient.setQueryData(["bookmarkIds", userUid], []);
      return;
    }

    // Fetch bookmark ids
    const q = query(bookmarksCollectionRef, where("bookmarkedBy", "==", userUid));

    // Real-time listener, listens for changes in bookmarkIds collection (add/update/delete)
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedBookmarkIds: string[] = snapshot.docs.map((doc) => doc.id);
        // Update TanStack Query cache
        queryClient.setQueryData(["bookmarkIds", userUid], fetchedBookmarkIds);
      },
      (error) => {
        throw new Error("Error fetching bookmark ids", error);
      },
    );

    return () => unsubscribe();
  }, [userUid]);

  return {
    bookmarkIds,
    isLoadingBookmarkIds,
    isBookmarkIdsError,
    bookmarkIdsError,
  };
}
