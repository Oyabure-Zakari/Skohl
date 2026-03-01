import COLORS from "@/constants/colors";
import blurhash from "@/constants/expoBlurImage";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/firebase/firebase.config";
import { useUserProfile } from "@/hooks/userProfile";
import OtherUserType from "@/types/OtherUser";
import formatMessageCount from "@/utils/formatMessageCount";
import formatFullName from "@/utils/formatUserFullname";
import generateRoomId from "@/utils/generateRoomId";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/elements";
import { Image } from "expo-image";
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
import { GiftedChat, IMessage } from "react-native-gifted-chat";

export default function ChatRoom() {
  const router = useRouter();
  const { userUid } = useAuth();
  const { data: user } = useUserProfile(userUid!);

  const otherUser: OtherUserType = useLocalSearchParams();
  const roomId = generateRoomId(userUid!, otherUser?.userUid);

  const [messages, setMessages] = useState<IMessage[]>([]);

  const headerHeight = useHeaderHeight();
  const firstName = formatFullName(otherUser?.fullName).split(" ")[1];

  // Create chat room if it doesn't exist
  useEffect(() => {
    const createChatRoom = async () => {
      // A document reference of the particular chat room doc
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
        lastMessage: null,
        lastMessageSender: null,
        lastMessageTime: null,
        participants: [userUid, otherUser?.userUid].sort(),
      });
    };

    createChatRoom();
  }, [roomId, userUid, otherUser]);

  // Fetch message using onSnapshot Real-time listener
  useEffect(() => {
    const messagesRef = collection(db, "chatRooms", roomId, "messages");
    // Order by createdAt ascending so GiftedChat (which reverses internally) displays correctly
    const messagesQuery = query(messagesRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const fetchedMessages: IMessage[] = snapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          _id: doc.id,
          text: data.message,
          // Firestore Timestamps need to be converted to JS Date
          createdAt: data.createdAt?.toDate?.() ?? new Date(),
          user: {
            _id: data.senderUid,
            avatar: data.senderAvatar,
          },
        };
      });

      // GiftedChat expects messages in descending order (newest first)
      setMessages(fetchedMessages.reverse());
    });

    // Cleanup listener when component unmounts or roomId changes
    return () => unsubscribe();
  }, [roomId]);

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
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back-sharp" size={24} color={COLORS.darkBlue} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/(private)/(tabs)/Profile")}>
            <Image
              source={{ uri: otherUser?.image }}
              style={{ width: 40, height: 40, borderRadius: 20 }}
              placeholder={{ blurhash }}
              contentFit="contain"
              transition={1000}
              alt="Profile Picture"
            />
          </TouchableOpacity>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 20,
              fontFamily: "Segoe_UI_Bold_Italic",
              color: COLORS.darkBlue,
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
            backgroundColor: "#dddddd",
            paddingHorizontal: 8,
            borderRadius: 10,
          }}
        >
          <FontAwesome6
            name="message"
            size={20}
            color={COLORS.darkBlue}
            style={{ alignSelf: "center" }}
          />
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
        keyboardVerticalOffset={headerHeight + 80}
      >
        <GiftedChat
          messages={messages}
          onSend={(msgs) => onSend(msgs)}
          user={{
            _id: userUid!,
          }}
          keyboardAvoidingViewProps={{ keyboardVerticalOffset: headerHeight }}
          colorScheme="dark"
          messagesContainerStyle={{ backgroundColor: COLORS.lightGrey }}
          isAvatarOnTop={true}
          isAlignedTop={true}
        />
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({});
