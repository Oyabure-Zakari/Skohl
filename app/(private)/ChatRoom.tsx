import COLORS from "@/constants/colors";
import blurhash from "@/constants/expoBlurImage";
import { useAuth } from "@/contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
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
  console.log("Other user:", otherUser);

  const getRoomId = (user1: string, user2: string): string => {
    return [user1, user2].sort().join("-");
  };

  const createChatRoom = async () => {
    const roomId = getRoomId(userUid!, otherUser?.userUid);
    console.log("ChatRoom Id", roomId);
  };

  useEffect(() => {
    createChatRoom();
  }, []);

  return (
    <View>
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
          style={{ width: 80, height: 80, borderRadius: 50 }}
          placeholder={{ blurhash }}
          contentFit="contain"
          transition={1000}
          alt="Profile Picture"
        />
      </TouchableOpacity>

      {/* User Name */}
      <Text>{otherUser?.fullName}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
