import { db } from "@/firebase/firebase.config";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect } from "react";
import { useWindowDimensions } from "react-native";
import { IMessage } from "react-native-gifted-chat";
import Toast from "react-native-toast-message";

export const useFetchChatMessages = (roomId: string) => {
  const { fontScale } = useWindowDimensions();
  const queryClient = useQueryClient();

  const {
    data: messages = [],
    isLoading: isLoadingMessages,
    isError: isErrorMessages,
    error: errorMessages,
  } = useQuery<IMessage[]>({
    queryKey: ["messages", roomId],
    staleTime: Infinity, // Never stale — onSnapshot keeps it fresh
    gcTime: 5 * 60 * 1000, // Cache 5 min after unmount
    queryFn: () => Promise.resolve([]), // Placeholder — onSnapshot handles fetching
  });

  useEffect(() => {
    const messagesRef = collection(db, "chatRooms", roomId, "messages");
    const messagesQuery = query(messagesRef, orderBy("createdAt", "asc"));

    // Real-time listener, listens for changes in messages collection (add/update/delete)
    const unsubscribe = onSnapshot(
      messagesQuery,
      (snapshot) => {
        const fetchedMessages: IMessage[] = snapshot.docs.map((doc) => {
          const data = doc.data();

          return {
            _id: doc.id,
            text: data.message,
            createdAt: data.createdAt?.toDate?.() ?? new Date(),
            user: {
              _id: data.senderUid,
              avatar: data.senderAvatar,
            },
          };
        });

        // Update TanStack Query cache with newest messages first
        queryClient.setQueryData(["messages", roomId], fetchedMessages.reverse());
      },
      (error: any) => {
        Toast.show({
          type: "error",
          text1: "Failed to load messages",
          text2: `Check connection. Error:${error.message}`,
          text1Style: { fontSize: fontScale * 16, fontFamily: "Segoe_UI_Bold" },
          text2Style: { fontSize: fontScale * 12, fontFamily: "Segoe_UI_Bold" },
        });
      },
    );

    return () => unsubscribe();
  }, [roomId]);

  return {
    messages,
    isLoadingMessages,
    isErrorMessages,
    errorMessages,
  };
};
