// React
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// React Native
import { View } from "react-native";
// Libraries/package
import BottomSheet from "@gorhom/bottom-sheet";
import { FlashList } from "@shopify/flash-list";
import { onSnapshot, orderBy, query, where } from "firebase/firestore";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// Components
import BottomSheetComponent from "@/components/bottomSheet/BottomSheetComponent";
import ChatIllustration from "@/components/chatListComponent/ChatIllustration";
import ChatListCard from "@/components/chatListComponent/ChatListCard";
import NoChatsComponent from "@/components/NoChatsComponent";
import FloatingActionButton from "@/components/reuseableComponents/FloatingActionButton";
import PostFeedHeader from "@/components/reuseableComponents/postsFeedComponent/PostFeedHeader";
// Contexts
import { useAuth } from "@/contexts/AuthContext";
// Firebase
import chatRoomsCollectionRef from "@/firebase/collectionRef/chatRoomsCollectionRef";
// Styles
import gestureHandlerRootViewStyle from "@/styles/gestureHandlerRootView.styles";
import useChatListStyles from "@/styles/useChatList.styles";
// Types
import ChatRoomsType from "@/types/chatRoomType";

export default function ChatListScreen() {
  // Styles
  const chatsListStyles = useChatListStyles();

  // States
  const [activeBottomSheet, setActiveBottomSheet] = useState<"Create Post" | "Send Feedback">(
    "Create Post",
  );

  // Refs
  const sheetRef = useRef<BottomSheet>(null);

  // Bottom Sheet snap points
  const snapPoints = useMemo(() => ["1%", "50%", "100%"], []);

  const [chatRooms, setChatRooms] = useState<ChatRoomsType[]>([]);

  // Firebase auth context
  const { userUid } = useAuth();

  useEffect(() => {
    if (!userUid) {
      setChatRooms([]);
      return;
    }

    // Query: all chat rooms where current user is in the participants array
    const q = query(
      chatRoomsCollectionRef,
      where("participants", "array-contains", userUid),
      orderBy("lastMessageTime", "desc"), // newest active chats first
    );

    // Real-time listener
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const rooms: ChatRoomsType[] = snapshot.docs.map((doc) => ({
          ...doc.data(), // spread all fields
        })) as ChatRoomsType[];

        setChatRooms(rooms);
      },
      (error: any) => {
        console.error("Chat rooms listener error:", error.message);
      },
    );

    // Cleanup listener when component unmounts or userUid changes
    return () => unsubscribe();
  }, []);

  // Handlers
  const handleSnapPress = useCallback(() => {
    sheetRef.current?.snapToIndex(2);
  }, []);

  return (
    <GestureHandlerRootView style={gestureHandlerRootViewStyle.container}>
      {/* Header: User Name + User Image */}
      <PostFeedHeader screenText={"Chats"} />

      {/* Chat Illustration */}
      <ChatIllustration />

      {/* Bottom Sheet */}
      <BottomSheetComponent
        sheetRef={sheetRef}
        snapPoints={snapPoints}
        activeBottomSheet={activeBottomSheet}
      />

      <FlashList
        data={chatRooms}
        keyExtractor={(item) => item.roomId}
        renderItem={({ item }) => <ChatListCard chatRoomData={item} />}
        style={chatsListStyles.list}
        contentContainerStyle={chatsListStyles.listContent}
        ItemSeparatorComponent={() => <View style={chatsListStyles.separator} />}
        ListEmptyComponent={() => <NoChatsComponent />}
      />

      {/* Floating Action Button */}
      <FloatingActionButton
        setActiveBottomSheet={setActiveBottomSheet}
        handleSnapPress={handleSnapPress}
      />
    </GestureHandlerRootView>
  );
}
