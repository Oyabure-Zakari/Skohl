import COLORS from "@/constants/colors";
import blurhash from "@/constants/expoBlurImage";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/hooks/userProfile";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

export default function ProfilePicture() {
  // User id
  const { id } = useLocalSearchParams();

  // Currently logged in user
  const { userUid } = useAuth();

  // Router
  const router = useRouter();

  // Fecth user data from Firestore
  const { data: user } = useUserProfile(id as string | null);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.darkBlue,
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 16,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-sharp" size={24} color={COLORS.lightGrey} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Entypo name="dots-three-vertical" size={24} color={COLORS.lightGrey} />
        </TouchableOpacity>
      </View>

      <Image
        source={{ uri: user?.image }}
        style={{
          width: "90%",
          height: 350,
          alignSelf: "center",
          borderRadius: 5,
          resizeMode: "cover",
          overflow: "hidden",
          //backgroundColor: "red",
        }}
        placeholder={{ blurhash }}
        contentFit="contain"
        transition={1000}
        alt="Avatar"
      />

      <TouchableOpacity
        style={{
          borderColor: COLORS.lightGrey,
          borderWidth: 1,
          borderRadius: 5,
          padding: 5,
          width: "20%",
          alignSelf: "center",
          marginBottom: 40,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: COLORS.lightGrey,
            fontFamily: "Segoe_UI_Bold",
            fontSize: 12,
            paddingHorizontal: 5,
          }}
        >
          Edit
        </Text>
      </TouchableOpacity>
    </View>
  );
}
