import OverlayLoadingIndicator from "@/components/reuseableComponents/OverlayLoadingIndicator";
import COLORS from "@/constants/colors";
import blurhash from "@/constants/expoBlurImage";
import IMAGES from "@/constants/images";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/firebase/firebase.config";
import useCreateChatRoom from "@/hooks/useCreateChatRoom.ts";
import { useFetchChatMessages } from "@/hooks/useFetchChatMessages";
import { useUserProfile } from "@/hooks/userProfile";
import OtherUserType from "@/types/OtherUser";
import formatMessageCount from "@/utils/formatMessageCount";
import formatFullName from "@/utils/formatUserFullname";
import generateRoomId from "@/utils/generateRoomId";
import { FontAwesome, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import { Image, ImageBackground } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import React, { useCallback, useEffect } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Bubble,
  Composer,
  GiftedChat,
  IMessage,
  InputToolbar,
  Send,
} from "react-native-gifted-chat";

export default function ChatRoom() {
  const router = useRouter();
  const { userUid } = useAuth();
  const { data: user } = useUserProfile(userUid!);

  const otherUser: OtherUserType = useLocalSearchParams();
  const roomId = generateRoomId(userUid!, otherUser?.userUid);

  const headerHeight = useHeaderHeight();
  const firstName = formatFullName(otherUser?.fullName).split(" ")[1];

  const { createChatRoom, isCreateChatRoomError, createChatRoomError } = useCreateChatRoom();

  // Create chat room if it doesn't exist
  useEffect(() => {
    createChatRoom({ roomId, userUid: userUid!, otherUser });
  }, [roomId, userUid, otherUser]);

  // Fetch message using onSnapshot Real-time listener + Tanstack Query for caching
  const { messages, isLoadingMessages } = useFetchChatMessages(roomId);

  // Send a new message
  const onSend = useCallback(
    async (newMessages: IMessage[] = []) => {
      const messageInfo = newMessages[0];

      try {
        const messagesRef = collection(db, "chatRooms", roomId, "messages");

        const docRef = await addDoc(messagesRef, {
          message: messageInfo.text,
          senderUid: messageInfo?.user?._id,
          senderAvatar: messageInfo?.user?.avatar || user?.image,
          // Use JS Date here so onSnapshot can immediately read it before server resolves
          createdAt: messageInfo?.createdAt ?? new Date(),
        });

        updateDoc(docRef, { id: docRef.id });

        updateDoc(doc(db, "chatRooms", roomId), {
          lastMessage: messageInfo.text,
          lastMessageSender: messageInfo?.user?._id,
          lastMessageTime: serverTimestamp(),
        });
      } catch (error: any) {
        console.error("Error sending message:", error.message);
      }
    },
    [roomId, user?.image],
  );

  const messageCount = formatMessageCount(messages.length);

  if (isLoadingMessages) {
    return <OverlayLoadingIndicator />;
  }

  if (isCreateChatRoomError) {
    return Alert.alert(`Error: ${createChatRoomError?.message}`);
  }

  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            // Your own sent message bubble
            backgroundColor: COLORS.purple,
            borderRadius: 10,
            marginBottom: 4,
          },
          left: {
            // Other person's received message bubble
            backgroundColor: COLORS.darkBlue,
            borderRadius: 10,
            marginBottom: 4,
          },
        }}
        textStyle={{
          right: {
            color: COLORS.lightGrey,
            fontFamily: "Segoe_UI_Bold",
            fontSize: 14,
          },
          left: {
            color: COLORS.lightGrey,
            fontFamily: "Segoe_UI_Bold",
            fontSize: 14,
          },
        }}
        timeTextStyle={{
          right: { color: "rgba(255,255,255,0.6)", fontSize: 11 },
          left: { color: "rgba(255,255,255,0.6)", fontSize: 11 },
        }}
      />
    );
  };

  const renderInputToolbar = (props: any) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: COLORS.darkBlue,
          borderTopWidth: 0,
          paddingHorizontal: 10,
          paddingVertical: 8,
          marginHorizontal: 12,
          marginBottom: 10,
          borderRadius: 30,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
        primaryStyle={{ alignItems: "center" }}
      />
    );
  };

  const renderComposer = (props: any) => {
    return (
      <Composer
        {...props}
        textInputStyle={{
          color: COLORS.lightGrey,
          fontFamily: "Segoe_UI_Bold_Italic",
          fontSize: 14,
          lineHeight: 20,
          paddingTop: 8,
          paddingHorizontal: 10,
        }}
        placeholderTextColor="rgba(0,0,0,0.4)"
        placeholder="Type a message..."
      />
    );
  };

  const renderSend = (props: any) => {
    return (
      <Send
        {...props}
        containerStyle={{
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 8,
          paddingBottom: 4,
        }}
      >
        {/* Replace the default send icon with your own */}
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FontAwesome name="send" size={18} color={COLORS.lightGrey} />
        </View>
      </Send>
    );
  };

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

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
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
            renderBubble={renderBubble}
            renderSend={renderSend}
            renderInputToolbar={renderInputToolbar} // 👈
            renderComposer={renderComposer} // 👈
            user={{
              _id: userUid!,
            }}
            keyboardAvoidingViewProps={{ keyboardVerticalOffset: headerHeight }}
            messagesContainerStyle={{ backgroundColor: "transparent" }} // Make it transparent so bg shows
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
