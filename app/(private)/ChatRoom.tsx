import COLORS from "@/constants/colors";
import blurhash from "@/constants/expoBlurImage";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/firebase/firebase.config";
import formatFullName from "@/utils/formatUserFullname";
import { Ionicons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
    name: string;
    avatar: string | undefined;
  };
};

export default function ChatRoom() {
  const router = useRouter();
  const { userUid } = useAuth();
  const otherUser: OtherUserType = useLocalSearchParams();

  const getRoomId = (user1: string, user2: string): string => {
    return [user1, user2].sort().join("-");
  };

  const createChatRoom = async () => {
    // Create a unique room ID by combining the two user IDs (e.g. "uid1-uid2")
    const roomId = getRoomId(userUid!, otherUser?.userUid);

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
      createdAt: serverTimestamp(),
      // These fields start as null because no messages exist yet
      lastMessage: null,
      lastMessageSender: null,
      lastMessageTime: null,
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
          name: firstName, // ← Display name of the sender
          avatar: otherUser?.image, // ← Profile picture of the sender
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
  }, []);

  return (
    <>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 16 }}>
        {/* Back Btn */}
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-sharp" size={24} color={COLORS.darkBlue} />
        </TouchableOpacity>

        {/* Profile Image */}
        <TouchableOpacity
          onPress={() => router.push(`/(private)/otherUserProfile/${otherUser?.userUid}`)}
        >
          <Image
            source={{ uri: otherUser?.image }}
            style={{ width: 50, height: 50, borderRadius: 25 }}
            placeholder={{ blurhash }}
            contentFit="contain"
            transition={1000}
            alt="Profile Picture"
          />
        </TouchableOpacity>

        {/* User Name */}
        <Text style={{ fontSize: 20, fontFamily: "Segoe_UI_Bold_Italic", color: COLORS.darkBlue }}>
          {firstName}
        </Text>
      </View>

      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages as never[])}
        user={{
          _id: 1,
        }}
        keyboardAvoidingViewProps={{ keyboardVerticalOffset: headerHeight }}
      />
    </>
  );
}

const styles = StyleSheet.create({});
