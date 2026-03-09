import blurhash from "@/constants/expoBlurImage";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/hooks/userProfile"; // ← Add this import!
import useChatListStyles from "@/styles/useChatList.styles";
import ChatRoomsType from "@/types/chatRoomType";
import formatFullName from "@/utils/formatUserFullname";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import ReactTimeAgo from "react-time-ago";
import OverlayLoadingIndicator from "../reuseableComponents/OverlayLoadingIndicator";

type ChatListCardProps = {
  chatRoomData: ChatRoomsType;
};

function Time({ children }: { children: string }) {
  return <Text>{children}</Text>;
}

const ChatListCard: React.FC<ChatListCardProps> = ({ chatRoomData }) => {
  const router = useRouter();

  // styles
  const chatsListStyles = useChatListStyles();

  // Firebase auth context
  const { userUid } = useAuth();

  // Find the OTHER user's UID (not the current logged-in user)
  const otherUserUid = chatRoomData.participants.find((uid) => uid !== userUid);

  // Dynamically fetch the other user's profile using your existing hook
  const { data: otherUserProfile, isPending: isLoadingOtherUserProfile } = useUserProfile(
    otherUserUid!,
  );

  // Extract chat room data
  const { lastMessage, lastMessageTime, lastMessageSender } = chatRoomData;

  // Checks if the last message was sent by the current user
  const wasSentByCurrentUser = lastMessageSender === userUid;

  // Safe timestamp conversion with fallback
  const messageTime = lastMessageTime?.seconds
    ? new Date(lastMessageTime.seconds * 1000 + (lastMessageTime.nanoseconds || 0) / 1000000)
    : new Date();

  // Show loading state or fallback while profile loads
  if (isLoadingOtherUserProfile || !otherUserProfile) {
    return <OverlayLoadingIndicator />;
  }

  return (
    <TouchableOpacity
      style={chatsListStyles.chatRow}
      disabled={!otherUserUid}
      onPress={() => router.push(`/(private)/chatRoom/${otherUserUid}`)}
    >
      {/* Other user's profile picture */}
      <Image
        source={{ uri: otherUserProfile?.image }}
        style={{ width: 40, height: 40, borderRadius: 20 }}
        placeholder={{ blurhash }}
        transition={300}
        contentFit="cover"
      />

      {/* Text content */}
      <View style={chatsListStyles.chatInfo}>
        {/* Display correct name based on current user */}
        <Text numberOfLines={1} style={chatsListStyles.name}>
          {formatFullName(otherUserProfile?.fullName).split(" ")[1]}
        </Text>

        {/* Last message preview */}
        <Text style={chatsListStyles.preview} numberOfLines={1}>
          {lastMessage ? `${wasSentByCurrentUser ? "You: " : ""}${lastMessage}` : "No messages yet"}
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
            tick={true}
            updateInterval={60000}
          />
        )}
      </Text>
    </TouchableOpacity>
  );
};

export default ChatListCard;
