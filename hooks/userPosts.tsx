import { Post } from "@/types/PostTypes";
import { useQuery } from "@tanstack/react-query";

export const useUserPosts = (userUid: string | null | undefined) => {
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
      return Promise.resolve([]); // or throw if you want
    },
  });

  return {
    posts,
    isLoadingCreatedPosts,
    isError,
    error,
  };
};
