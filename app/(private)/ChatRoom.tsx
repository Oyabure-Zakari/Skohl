import COLORS from "@/constants/colors";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/firebase/firebase.config";
import formatFullName from "@/utils/formatUserFullname";
import generateRoomId from "@/utils/generateRoomId";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

type OtherUserType = {
  fullName: string;
  image?: string | undefined;
  userUid: string;
};

type MessagesType = {
  _id: string;
  text: string;
  createdAt: Date;
  user: {
    _id: string;
    avatar: string | undefined;
  };
};

export default function ChatRoom() {
  const router = useRouter();
  const { userUid } = useAuth();
  const otherUser: OtherUserType = useLocalSearchParams();

  const createChatRoom = async () => {
    // Create a unique room ID by combining the two user IDs (e.g. "uid1-uid2")
    const roomId = generateRoomId(userUid!, otherUser?.userUid);

    // A reference (like an address) to where this chat room document lives in Firestore
    const docRef = doc(db, "chatRooms", roomId);

    // Fetch the chat room document from Firestore using the reference
    const docSnap = await getDoc(docRef);

    // Check if the chat room document already exists in the database
    const chatRoomExists = docSnap.exists();

    // If the chat room already exists, do nothing and exit early (no need to create it again)
    if (chatRoomExists) return;

    // If we reached here → the chat room does NOT exist yet, so create it
    await setDoc(docRef, {
      roomId,
      otherUser,
      createdAt: serverTimestamp(),
      // These fields start as null because no messages exist yet
      lastMessage: null,
      lastMessageSender: null,
      lastMessageTime: null,
      // Store both users in an array so we can query "all chat rooms the currently logged in user is part of". This works the same whether the currently logged in user start the chat or the other person does.
      participants: [userUid, otherUser?.userUid].sort(),
    });
  };

  const firstName = formatFullName(otherUser?.fullName).split(" ")[1];

  useEffect(() => {
    createChatRoom();
  }, []);

  const [messages, setMessages] = useState<MessagesType[]>([]);

  // keyboardVerticalOffset = distance from screen top to GiftedChat container
  // useHeaderHeight() returns status bar + navigation header height
  const headerHeight = useHeaderHeight();

  useEffect(() => {
    setMessages([
      {
        _id: "msdl", // ← This is the unique ID of **this message**
        text: "Hello developer", // ← The actual text/content of the message
        createdAt: new Date(), // ← When the message was sent (timestamp)
        user: {
          // ← This whole object describes **who sent it**
          _id: otherUser?.userUid, // ← Unique ID of the **sender** (not the message)
          avatar: otherUser?.image, // ← Profile picture of the sender
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
  }, []);

  function formatMessageCount(count: number) {
    if (count < 1000) return count.toString();
    if (count < 10000) return (count / 1000).toFixed(1) + "k";
    if (count < 1000000) return Math.round(count / 1000) + "k";
    return (count / 1000000).toFixed(1) + "M";
  }

  const messageCount = formatMessageCount(messages.length);

  return (
    <>
      <StatusBar style="dark" backgroundColor={COLORS.lightGrey} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 16,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          {/* Back Btn */}
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back-sharp" size={24} color={COLORS.darkBlue} />
          </TouchableOpacity>

          {/* User Name */}
          <Text
            style={{ fontSize: 20, fontFamily: "Segoe_UI_Bold_Italic", color: COLORS.darkBlue }}
          >
            {`${firstName}`}
          </Text>
        </View>

        {/* Messages Count */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            backgroundColor: "#dddddd",
            justifyContent: "center",
            paddingHorizontal: 10,
            borderRadius: 10,
          }}
        >
          <FontAwesome6 name="message" size={20} color={COLORS.darkBlue} />
          <Text
            style={{
              textAlign: "center",
              fontSize: 14,
              fontFamily: "Segoe_UI_Bold_Italic",
              color: COLORS.darkBlue,
            }}
          >
            {messageCount}
          </Text>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, backgroundColor: COLORS.lightGrey }}
      >
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages as never[])}
          user={{
            _id: userUid!,
          }}
          keyboardAvoidingViewProps={{ keyboardVerticalOffset: headerHeight }}
          colorScheme="dark"
          messagesContainerStyle={{ backgroundColor: COLORS.lightGrey }}
          isAvatarOnTop={true}
        />
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({});
