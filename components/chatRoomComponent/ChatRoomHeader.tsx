import COLORS from "@/constants/colors";
import blurhash from "@/constants/expoBlurImage";
import useChatRoomStyles from "@/styles/chatRoom.styles";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type OtherUser = {
  fullName: string;
  image: string;
  uid: string;
};

type ChatRoomHeaderProps = {
  otherUser: OtherUser;
  messageCount: string;
  firstName: string;
};

const ChatRoomHeader: React.FC<ChatRoomHeaderProps> = ({ otherUser, messageCount, firstName }) => {
  const chatRoomStyles = useChatRoomStyles();
  const router = useRouter();

  return (
    <View style={chatRoomStyles.header}>
      {/* Back Btn */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-sharp" size={24} color={COLORS.lightGrey} />
        </TouchableOpacity>

        {/* Profile Picture */}
        <TouchableOpacity
          onPress={() => router.push(`/(private)/otherUserProfile/${otherUser?.uid}`)}
        >
          <Image
            source={{ uri: otherUser?.image }}
            style={{ width: 40, height: 40, borderRadius: 20, marginBottom: 10 }}
            placeholder={{ blurhash }}
            contentFit="contain"
            transition={1000}
            alt="Profile Picture"
          />
        </TouchableOpacity>

        {/* User Name */}
        <Text numberOfLines={1} style={chatRoomStyles.headerNameText}>
          {firstName}
        </Text>
      </View>

      {/* Message Count */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <FontAwesome6
          name="message"
          size={16}
          color={COLORS.lightGrey}
          style={{ alignSelf: "center" }}
        />
        <Text style={chatRoomStyles.headerMessageCountText}>{messageCount}</Text>
      </View>
    </View>
  );
};

export default ChatRoomHeader;
