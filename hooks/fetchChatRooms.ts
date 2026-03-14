import { ERRORSOUND } from "@/constants/soundConfig";
import chatRoomsCollectionRef from "@/firebase/collectionRef/chatRoomsCollectionRef";
import ChatRoomsType from "@/types/chatRoomType";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import * as Haptics from "expo-haptics";
import { onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect } from "react";
import { useWindowDimensions } from "react-native";
import Toast from "react-native-toast-message";
import { usePlaySound } from "./playSound";

export const useFetchChatRooms = (userUid: string | null) => {
  const { fontScale } = useWindowDimensions();

  const { playSound } = usePlaySound();

  // Give us access to tanstack query methods
  const queryClient = useQueryClient();

  const {
    data: chatRooms = [],
    isLoading: isLoadingChatRooms,
    isError: isChatRoomsError,
    error: chatRoomsError,
  } = useQuery<ChatRoomsType[]>({
    queryKey: ["chatRooms", userUid],
    staleTime: Infinity, // Never stale — onSnapshot keeps it fresh
    gcTime: 5 * 60 * 1000, // Cache 5 min after unmount
    queryFn: () => Promise.resolve([]), // Placeholder — onSnapshot handles fetching
    enabled: !!userUid, // Don't run if userUid is null
  });

  useEffect(() => {
    // If no userUid, clear the cache and exit
    if (!userUid) {
      queryClient.setQueryData(["chatRooms", userUid], []);
      return;
    }

    // Query all chat rooms where current user is in the participants array
    const q = query(
      chatRoomsCollectionRef,
      where("participants", "array-contains", userUid),
      orderBy("lastMessageTime", "desc"), // Newest active chats first
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const rooms: ChatRoomsType[] = snapshot.docs.map((doc) => ({
          ...doc.data(),
        })) as ChatRoomsType[];

        // Update TanStack Query cache
        queryClient.setQueryData(["chatRooms", userUid], rooms);
      },
      (error: any) => {
        // Plays error sound
        playSound(ERRORSOUND);

        // Haptic  feedback
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

        // Toast notification
        Toast.show({
          type: "error",
          text1: "Failed to load chats",
          text2: error.message || "Check connection",
          text1Style: { fontSize: fontScale * 16, fontFamily: "Segoe_UI_Bold" },
          text2Style: { fontSize: fontScale * 12, fontFamily: "Segoe_UI_Bold" },
        });
      },
    );

    return () => unsubscribe();
  }, [userUid]);

  return {
    chatRooms,
    isLoadingChatRooms,
    isChatRoomsError,
    chatRoomsError,
  };
};
