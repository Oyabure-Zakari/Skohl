import blurhash from "@/constants/expoBlurImage";
import { useAuth } from "@/contexts/AuthContext";
import useChatListStyles from "@/styles/useChatList.styles";
import ChatRoomsType from "@/types/chatRoomType";
import formatFullName from "@/utils/formatUserFullname";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import ReactTimeAgo from "react-time-ago";

type ChatListCardProps = {
  chatRoomData: ChatRoomsType;
};

function Time({ children }: { children: string }) {
  return <Text>{children}</Text>;
}

const ChatListCard: React.FC<ChatListCardProps> = ({ chatRoomData }) => {
  const router = useRouter();
  const { userUid } = useAuth();
  const { otherUser, lastMessage, lastMessageTime, lastMessageSender } = chatRoomData;

  const isOwnMessage = lastMessageSender === userUid;

  // Safe timestamp conversion with fallback
  const messageTime = lastMessageTime?.seconds
    ? new Date(lastMessageTime?.seconds * 1000 + (lastMessageTime?.nanoseconds || 0) / 1000000)
    : new Date(); // fallback to now

  const handleNavigateToChatRoom = () => {
    router.push(`/(private)/chatRoom/${otherUser?.uid}`);
  };

  const chatsListStyles = useChatListStyles();

  return (
    <TouchableOpacity
      style={chatsListStyles.chatRow}
      // Navigate to chat room
      disabled={!otherUser?.uid}
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

export default ChatListCard;
