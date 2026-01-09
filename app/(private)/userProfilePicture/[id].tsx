import COLORS from "@/constants/colors";
import blurhash from "@/constants/expoBlurImage";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile } from "@/hooks/userProfile";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProfilePicture() {
  // User id
  const { id } = useLocalSearchParams();

  // Currently logged in user
  const { userUid } = useAuth();

  // Check if currently logged in user id is the same as the user id
  const isCurrentlyLoggedInUser = userUid === id;
  // const isCurrentlyLoggedInUser = false;

  // Router
  const router = useRouter();

  // Fecth user data from Firestore
  const { data: user } = useUserProfile(id as string | null);

  return (
    <View style={profilePictureStyles.container}>
      {/* Header */}
      <View style={profilePictureStyles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-sharp" size={24} color={COLORS.lightGrey} />
        </TouchableOpacity>

        {isCurrentlyLoggedInUser && (
          <TouchableOpacity>
            <Entypo name="dots-three-vertical" size={24} color={COLORS.lightGrey} />
          </TouchableOpacity>
        )}
      </View>

      {/* Profile Picture */}
      <Image
        source={{ uri: user?.image }}
        style={profilePictureStyles.profilePicture}
        placeholder={{ blurhash }}
        contentFit="contain"
        transition={1000}
        alt="Avatar"
      />

      {isCurrentlyLoggedInUser && (
        <TouchableOpacity style={profilePictureStyles.editBtn}>
          <Text style={profilePictureStyles.editBtnText}>Edit</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const profilePictureStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
    paddingVertical: 40,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  profilePicture: {
    width: "90%",
    height: 350,
    alignSelf: "center",
    borderRadius: 5,
    resizeMode: "cover",
    overflow: "hidden",
    marginTop: 150,
    //backgroundColor: "red",
  },

  editBtn: {
    borderColor: COLORS.lightGrey,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    width: "20%",
    alignSelf: "center",
    marginTop: "auto",
  },

  editBtnText: {
    textAlign: "center",
    color: COLORS.lightGrey,
    fontFamily: "Segoe_UI_Bold",
    fontSize: 12,
    paddingHorizontal: 5,
  },
});
