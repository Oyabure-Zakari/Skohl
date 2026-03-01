import CustomBubble from "@/components/customReactNativeGiftedChatComponent/CustomBubble";
import {
  CustomComposer,
  CustomInputToolbar,
} from "@/components/customReactNativeGiftedChatComponent/CustomInputToolbarAndComposer";
import OverlayLoadingIndicator from "@/components/reuseableComponents/OverlayLoadingIndicator";
import COLORS from "@/constants/colors";
import blurhash from "@/constants/expoBlurImage";
import IMAGES from "@/constants/images";
import { useAuth } from "@/contexts/AuthContext";
import useCreateChatRoom from "@/hooks/useCreateChatRoom.ts";
import { useFetchChatMessages } from "@/hooks/useFetchChatMessages";
import { useUserProfile } from "@/hooks/userProfile";
import { useSendMessage } from "@/hooks/useSendMessage";
import OtherUserType from "@/types/OtherUser";
import formatMessageCount from "@/utils/formatMessageCount";
import formatFullName from "@/utils/formatUserFullname";
import generateRoomId from "@/utils/generateRoomId";
import { FontAwesome, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import { Image, ImageBackground } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { GiftedChat, IMessage, Send } from "react-native-gifted-chat";
import Toast from "react-native-toast-message";

export default function ChatRoom() {
  const router = useRouter();
  const { fontScale } = useWindowDimensions();
  const { userUid } = useAuth();
  const { data: user } = useUserProfile(userUid!);

  const otherUser: OtherUserType = useLocalSearchParams();
  const roomId = generateRoomId(userUid!, otherUser?.userUid);

  // Create chat room if it doesn't exist
  const { createChatRoom, isCreateChatRoomError, createChatRoomError } = useCreateChatRoom();
  useEffect(() => {
    createChatRoom({ roomId, userUid: userUid!, otherUser });
  }, [roomId, userUid, otherUser]);

  // Fetch message using onSnapshot Real-time listener + Tanstack Query for caching
  const { messages, isLoadingMessages } = useFetchChatMessages(roomId);

  // Send a new message
  const { sendMessage } = useSendMessage();
  const onSend = useCallback(
    (newMessages: IMessage[] = []) => {
      sendMessage({
        roomId,
        messageInfo: newMessages[0],
        userImage: user?.image,
      });
    },
    [roomId, user?.image],
  );

  const headerHeight = useHeaderHeight();
  const firstName = formatFullName(otherUser?.fullName).split(" ")[1];
  const messageCount = formatMessageCount(messages.length);

  const renderSend = (props: any) => (
    <Send
      {...props}
      containerStyle={{
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 8,
        paddingBottom: 4,
      }}
    >
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <FontAwesome name="send" size={18} color={COLORS.lightGrey} />
      </View>
    </Send>
  );

  if (isLoadingMessages) return <OverlayLoadingIndicator />;

  if (isCreateChatRoomError) {
    Toast.show({
      type: "error",
      text1: "Error creating chat room",
      text2: `Error: ${createChatRoomError?.message}`,
      text1Style: { fontSize: fontScale * 16, fontFamily: "Segoe_UI_Bold" },
      text2Style: { fontSize: fontScale * 12, fontFamily: "Segoe_UI_Bold" },
    });
    return;
  }

  return (
    <>
      <StatusBar style="light" backgroundColor={COLORS.darkBlue} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 16,
          backgroundColor: COLORS.darkBlue,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back-sharp" size={24} color={COLORS.lightGrey} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push(`/(private)/otherUserProfile/${otherUser?.userUid}`)}
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

          <Text
            numberOfLines={1}
            style={{
              fontSize: 18,
              fontFamily: "Segoe_UI_Bold_Italic",
              color: COLORS.lightGrey,
              width: "60%",
            }}
          >
            {firstName}
          </Text>
        </View>

        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <FontAwesome6
            name="message"
            size={16}
            color={COLORS.lightGrey}
            style={{ alignSelf: "center" }}
          />
          <Text
            style={{
              textAlign: "center",
              fontSize: 14,
              fontFamily: "Segoe_UI_Bold_Italic",
              color: COLORS.lightGrey,
            }}
          >
            {messageCount}
          </Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={headerHeight + 80}
      >
        <ImageBackground source={IMAGES.pattern1} style={{ flex: 1 }} contentFit="cover">
          <GiftedChat
            messages={messages}
            onSend={(msgs) => onSend(msgs)}
            colorScheme="dark"
            renderBubble={(props) => <CustomBubble {...props} />}
            renderSend={renderSend}
            renderInputToolbar={(props) => <CustomInputToolbar {...props} />}
            renderComposer={(props) => <CustomComposer {...props} />}
            user={{ _id: userUid! }}
            keyboardAvoidingViewProps={{ keyboardVerticalOffset: headerHeight }}
            messagesContainerStyle={{ backgroundColor: "transparent" }}
            isAvatarOnTop={true}
            isAlignedTop={true}
            isSendButtonAlwaysVisible={true}
          />
        </ImageBackground>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({});
