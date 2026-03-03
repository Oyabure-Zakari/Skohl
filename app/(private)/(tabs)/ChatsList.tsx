import BottomSheetComponent from "@/components/bottomSheet/BottomSheetComponent";
import NoChatsComponent from "@/components/NoChatsComponent";
import FloatingActionButton from "@/components/reuseableComponents/FloatingActionButton";
import PostFeedHeader from "@/components/reuseableComponents/postsFeedComponent/PostFeedHeader";
import COLORS from "@/constants/colors";
import blurhash from "@/constants/expoBlurImage";
import IMAGES from "@/constants/images";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/firebase/firebase.config";
import gestureHandlerRootViewStyle from "@/styles/gestureHandlerRootView.styles";
import OtherUserType from "@/types/OtherUser";
import formatFullName from "@/utils/formatUserFullname";
import BottomSheet from "@gorhom/bottom-sheet";
import { FlashList } from "@shopify/flash-list";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { collection, FieldValue, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ReactTimeAgo from "react-time-ago";

type ChatRoomsType = {
  roomId: string;
  createdAt: FieldValue;
  lastMessage: null | string;
  lastMessageSender: null | string;
  lastMessageTime: { seconds: number; nanoseconds: number; type: string };
  participants: (string | null)[];
  otherUser: OtherUserType;
};

function Time({ children }: { children: string }) {
  return <Text>{children}</Text>;
}

export default function ChatListScreen() {
  // States
  const [activeBottomSheet, setActiveBottomSheet] = useState<"Create Post" | "Send Feedback">(
    "Create Post",
  );

  // Refs
  const sheetRef = useRef<BottomSheet>(null);

  // Bottom Sheet snap points
  const snapPoints = useMemo(() => ["1%", "50%", "100%"], []);

  // Handlers
  const handleSnapPress = useCallback(() => {
    sheetRef.current?.snapToIndex(2);
  }, []);

  const [chatRooms, setChatRooms] = useState<ChatRoomsType[]>([]);

  const chatRoomsCollectionRef = collection(db, "chatRooms");

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

  const router = useRouter();

  const renderItem = ({ item }: { item: ChatRoomsType }) => {
    const { otherUser, lastMessage, lastMessageTime, lastMessageSender } = item;

    const isOwnMessage = lastMessageSender === userUid;

    // Safe timestamp conversion with fallback
    const messageTime = lastMessageTime?.seconds
      ? new Date(lastMessageTime?.seconds * 1000 + (lastMessageTime?.nanoseconds || 0) / 1000000)
      : new Date(); // fallback to now

    const handleNavigateToChatRoom = () => {
      router.push({ pathname: "/(private)/ChatRoom", params: otherUser });
    };

    return (
      <TouchableOpacity
        style={chatsListStyles.chatRow}
        // Navigate to chat room
        onPress={handleNavigateToChatRoom}
      >
        {/* Avatar */}
        <Image
          source={{ uri: otherUser?.image }}
          style={{ width: 40, height: 40, borderRadius: 20 }}
          placeholder={{ blurhash }}
          transition={300}
          contentFit="cover"
        />

        {/* Text content */}
        <View style={chatsListStyles.chatInfo}>
          <Text style={chatsListStyles.name}>{formatFullName(otherUser?.fullName)}</Text>

          <Text style={chatsListStyles.preview} numberOfLines={1}>
            {lastMessage ? `${isOwnMessage ? "You: " : ""}${lastMessage}` : "No messages yet"}
          </Text>
        </View>

        {/* Timestamp */}
        <Text style={chatsListStyles.time}>
          {lastMessage && (
            <ReactTimeAgo
              date={messageTime}
              locale="en-US"
              component={Time}
              timeStyle="twitter"
              tick={true} // Auto-update enabled (this is the default)
              updateInterval={60000} // Update every minute
            />
          )}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <GestureHandlerRootView style={gestureHandlerRootViewStyle.container}>
      {/* Header: User Name + User Image */}
      <PostFeedHeader screenText={"Chats"} />

      <View
        style={{
          paddingHorizontal: 16,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontFamily: "Segoe_UI_Bold",
            color: COLORS.darkBlue,
            fontSize: 20,
            lineHeight: 25,
          }}
        >
          {`"Find someone${"\n"}to chat with"`}
        </Text>

        <Image
          source={IMAGES.hello}
          style={{ width: 100, height: 140 }}
          contentFit="contain"
          alt="Post feed illustration"
        />
      </View>

      {/* Bottom Sheet */}
      <BottomSheetComponent
        sheetRef={sheetRef}
        snapPoints={snapPoints}
        activeBottomSheet={activeBottomSheet}
      />

      <FlashList
        data={chatRooms}
        keyExtractor={(item) => item.roomId}
        renderItem={renderItem}
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
const chatsListStyles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: "#fff",
  },

  listContent: {
    paddingVertical: 8,
  },

  chatRow: {
    flexDirection: "row",
    padding: 12,
    alignItems: "center",
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGrey,
  },

  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
  },

  chatInfo: {
    flex: 1,
  },

  name: {
    fontSize: 14,
    fontFamily: "Segoe_UI_Bold",
    color: COLORS.darkBlue,
  },

  preview: {
    fontSize: 12,
    fontFamily: "Segoe_UI_Bold_Italic",
    color: COLORS.darkGrey,
  },

  time: {
    fontFamily: "Segoe_UI_Bold",
    color: COLORS.darkGrey,
    fontSize: 12,
    alignSelf: "flex-start",
  },

  separator: {
    height: 1,
    backgroundColor: "#eee",
    marginLeft: 80,
  },
});
