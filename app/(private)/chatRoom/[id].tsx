// React
import React, { useCallback, useEffect } from "react";
// React Native
import { Alert, KeyboardAvoidingView, Platform } from "react-native";
// Expo
import { ImageBackground } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
// Components
import ChatRoomHeader from "@/components/chatRoomComponent/ChatRoomHeader";
import CustomBubble from "@/components/customReactNativeGiftedChatComponent/CustomBubble";
import {
  CustomComposer,
  CustomInputToolbar,
} from "@/components/customReactNativeGiftedChatComponent/CustomInputToolbarAndComposer";
import { CustomSendBtn } from "@/components/customReactNativeGiftedChatComponent/CustomSendBtn";
import OverlayLoadingIndicator from "@/components/reuseableComponents/OverlayLoadingIndicator";
// Constants
import COLORS from "@/constants/colors";
import IMAGES from "@/constants/images";
// Contexts
import { useAuth } from "@/contexts/AuthContext";
// Custom Hooks
import useCreateChatRoom from "@/hooks/useCreateChatRoom.ts";
import { useFetchChatMessages } from "@/hooks/useFetchChatMessages";
import { useUserProfile } from "@/hooks/userProfile";
import { useSendMessage } from "@/hooks/useSendMessage";
// Utils
import formatMessageCount from "@/utils/formatMessageCount";
import formatFullName from "@/utils/formatUserFullname";
import generateRoomId from "@/utils/generateRoomId";
// Libraries/Packages
import { useHeaderHeight } from "@react-navigation/elements";
import { GiftedChat, IMessage } from "react-native-gifted-chat";

export default function ChatRoom() {
  // Get header height
  const headerHeight = useHeaderHeight();

  // Currently logged in user
  const { userUid } = useAuth();
  const { data: currentUser, isPending: isLoadingCurrentUser } = useUserProfile(userUid!);

  // Fetch other user
  const { id } = useLocalSearchParams();
  const { data: otherUser, isPending: isLoadingOtherUser } = useUserProfile(id as string);

  // Get chat room id
  const roomId = generateRoomId(userUid!, otherUser?.uid!);

  // Create chat room if it doesn't exist
  const { createChatRoom, isCreateChatRoomError, createChatRoomError } = useCreateChatRoom();
  useEffect(() => {
    createChatRoom({ roomId, currentUserId: userUid!, otherUserId: otherUser?.uid });
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
        userImage: currentUser?.image,
      });
    },
    [roomId, currentUser?.image],
  );

  // Extract user first name
  const firstName = formatFullName(otherUser?.fullName).split(" ")[1];

  // Format message count
  const messageCount = formatMessageCount(messages.length);

  if (isLoadingMessages || isLoadingCurrentUser || isLoadingOtherUser) {
    return <OverlayLoadingIndicator />;
  }

  if (isCreateChatRoomError)
    return Alert.alert("Error", `Error creating chat room:${createChatRoomError?.message}`);

  return (
    <>
      <StatusBar style="light" backgroundColor={COLORS.darkBlue} />
      {/* Back Btn + User Image + User Name + Message count*/}
      <ChatRoomHeader otherUser={otherUser} messageCount={messageCount} firstName={firstName} />

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
            renderSend={(props) => <CustomSendBtn {...props} />}
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
