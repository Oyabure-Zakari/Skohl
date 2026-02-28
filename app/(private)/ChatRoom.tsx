import COLORS from "@/constants/colors";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/firebase/firebase.config";
import { useUserProfile } from "@/hooks/userProfile";
import OtherUserType from "@/types/OtherUser";
import formatMessageCount from "@/utils/formatMessageCount";
import formatFullName from "@/utils/formatUserFullname";
import generateRoomId from "@/utils/generateRoomId";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
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

type MessagesType = {
  _id: string;
  text: string;
  createdAt: number | Date;
  user: {
    _id: string;
    avatar: string;
  };
};

export default function ChatRoom() {
  const router = useRouter();
  const { userUid } = useAuth();

  const otherUser: OtherUserType = useLocalSearchParams();

  const roomId = generateRoomId(userUid!, otherUser?.userUid);

  const [messages, setMessages] = useState<MessagesType[]>([]);

  const headerHeight = useHeaderHeight();

  const firstName = formatFullName(otherUser?.fullName).split(" ")[1];

  // Create chat room if it doesn't exist
  useEffect(() => {
    const createChatRoom = async () => {
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

    createChatRoom();
  }, [roomId, userUid, otherUser, otherUser?.userUid]);

  // Listen for real-time messages (new messages appear instantly)
  useEffect(() => {
    const messagesRef = collection(db, "chatRooms", roomId, "messages");

    const q = query(messagesRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedMessages: MessagesType[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          _id: data?.id, // ← This is the unique ID of this message
          text: data?.message, // ← The actual text/content of the message
          createdAt: data?.createdAt, // ← When the message was sent (timestamp)
          // ← This whole object describes who sent it
          user: {
            _id: data?.senderUid, // ← Unique ID of the sender (not the message)
            avatar: data?.senderAvatar, // ← Profile picture of the sender
          },
        };
      });

      setMessages(loadedMessages);
    });

    return () => unsubscribe();
  }, [roomId]);

  const { data: user } = useUserProfile(userUid!);

  // Send a new message
  const onSend = useCallback(
    async (newMessages: MessagesType[] = []) => {
      const messageInfo: MessagesType = newMessages[0];

      try {
        const messagesRef = collection(db, "chatRooms", roomId, "messages");

        const docRef = await addDoc(messagesRef, {
          message: messageInfo.text,
          senderUid: messageInfo?.user?._id,
          senderAvatar: messageInfo?.user?.avatar || user?.image,
        });

        updateDoc(docRef, { id: docRef.id });

        // Update room's last message info (for chat list preview)
        updateDoc(doc(db, "chatRooms", roomId), {
          lastMessage: messageInfo.text,
          lastMessageSender: messageInfo?.user?._id,
          lastMessageTime: serverTimestamp(),
        });
      } catch (error: any) {
        console.error("Error sending message:", error.message);
      }

      // Append locally (optimistic UI)
      setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
    },
    [roomId, user?.image, userUid],
  );

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
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={headerHeight + 80} // Adjust if needed
      >
        <GiftedChat
          messages={messages}
          onSend={(msgs) => onSend(msgs)}
          user={{
            _id: userUid!,
            //avatar: user?.image,
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
