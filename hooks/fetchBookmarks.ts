import bookmarksCollectionRef from "@/firebase/collectionRef/bookmarksCollectionRef";
import Bookmarks from "@/types/BookmarksType";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { onSnapshot, query, where } from "firebase/firestore";
import { useEffect } from "react";

export default function useFetchBookmarks(userUid: string | null) {
  // Gives us access to tanstack query methods
  const queryClient = useQueryClient();

  const {
    data: bookmarks = [],
    isLoading: isLoadingBookmarks,
    isError: isBookmarksError,
    error: bookmarksError,
  } = useQuery<Bookmarks[]>({
    queryKey: ["bookmarks", userUid],
    enabled: !!userUid,
    staleTime: Infinity,
    gcTime: 5 * 60 * 1000,
    queryFn: () => Promise.resolve([]),
  });

  useEffect(() => {
    // If no userUid, clear cache
    if (!userUid) {
      queryClient.setQueryData(["bookmarks", userUid], []);
      return;
    }

    // Fetch bookmarks
    const q = query(bookmarksCollectionRef, where("bookmarkedBy", "==", userUid));

    // Real-time listener lists for changes in bookmarks collection (add/update/delete)
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedBookmarks = snapshot.docs.map((doc) => ({
          ...doc.data(),
        })) as Bookmarks[];

        // Update TanStack Query cache with fetched bookmarks
        queryClient.setQueryData(["bookmarks", userUid], fetchedBookmarks);
      },
      (error) => {
        throw new Error("Error fetching bookmarks:", error);
      },
    );

    // Cleanup
    return () => unsubscribe();
  }, [userUid, queryClient]);

  return {
    bookmarks,
    isLoadingBookmarks,
    isBookmarksError,
    bookmarksError,
  };
}
