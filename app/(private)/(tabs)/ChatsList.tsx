// React
import { useCallback, useMemo, useRef, useState } from "react";
// React Native
import { View } from "react-native";
// Libraries/package
import BottomSheet from "@gorhom/bottom-sheet";
import { FlashList } from "@shopify/flash-list";
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
// Custom Hooks
import { useFetchChatRooms } from "@/hooks/fetchChatRooms";
// Styles
import gestureHandlerRootViewStyle from "@/styles/gestureHandlerRootView.styles";
import useChatListStyles from "@/styles/useChatList.styles";

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

  // Firebase auth context
  const { userUid } = useAuth();

  // Fetch chatRooms using onSnapshot for real time update + Tanstack QUery for caching
  const { chatRooms } = useFetchChatRooms(userUid);

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

      {/* Chat List */}
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
