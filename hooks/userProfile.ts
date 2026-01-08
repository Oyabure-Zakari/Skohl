import { useAuth } from "@/contexts/AuthContext";
import fetchUserInfo from "@/firebase/users/fetchUserInfo";
import { useQuery } from "@tanstack/react-query";

export const useUserProfile = () => {
  // Firebase Auth
  const { userUid } = useAuth();

  return useQuery<any>({
    queryKey: ["user", userUid],
    queryFn: () => fetchUserInfo(userUid),
    enabled: !!userUid, // Only run if userUid exists
    staleTime: 1000 * 60 * 4, // Cache for 4 minutes
  });
};
