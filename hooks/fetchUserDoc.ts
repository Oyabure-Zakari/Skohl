import usersCollectionRef from "@/firebase/collectionRef/usersCollectionRef";
import { useQuery } from "@tanstack/react-query";
import { getDocs, query, where } from "firebase/firestore";

const useFetchUserDoc = (userUid: string | null) => {
  const {
    data: userDoc,
    isLoading: userLoading,
    isError: userError,
    error: userErrorDetails,
    refetch,
  } = useQuery({
    queryKey: ["userDoc", userUid],
    queryFn: async () => {
      if (!userUid) return null;
      // Check if user doc exists
      const q = query(usersCollectionRef, where("uid", "==", userUid));
      const snapshot = await getDocs(q);
      // If user doc doesn't exist, return null
      return snapshot.empty ? null : snapshot.docs[0].data();
    },
    enabled: !!userUid, // Only fetch if userUid is defined
    retry: false, // Disable automatic retries
  });

  return { userDoc, userLoading, userError, userErrorDetails, refetch };
};

export default useFetchUserDoc;
