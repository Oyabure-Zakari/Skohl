import COLORS from "@/constants/colors";
import blurhash from "@/constants/expoBlurImage";
import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/firebase/firebase.config";
import formatFullName from "@/utils/formatUserFullname";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type OtherUserType = {
  fullName: string;
  image?: string | undefined;
  userUid: string;
};

export default function ChatRoom() {
  const router = useRouter();
  const { userUid } = useAuth();
  const otherUser: OtherUserType = useLocalSearchParams();

  const getRoomId = (user1: string, user2: string): string => {
    return [user1, user2].join("-");
  };

  const createChatRoom = async () => {
    const roomId = getRoomId(userUid!, otherUser?.userUid);
    await setDoc(doc(db, "chatRooms", roomId), {
      roomId,
      users: [userUid, otherUser?.userUid],
      createdAt: serverTimestamp(),
      lastMessage: "",
      lastMessageSender: "",
      lastMessageTime: serverTimestamp(),
    });
  };

  const firstName = formatFullName(otherUser?.fullName).split(" ")[1];

  useEffect(() => {
    createChatRoom();
  }, []);

  return (
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
  );
}

const styles = StyleSheet.create({});
