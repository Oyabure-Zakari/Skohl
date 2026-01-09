// React
import React from "react";
// React Native
import { Text, TouchableOpacity, View } from "react-native";
// Expo
import { Entypo, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
// Constants
import COLORS from "@/constants/colors";
import blurhash from "@/constants/expoBlurImage";
// Custom Hooks
import { useAuth } from "@/contexts/AuthContext";
// Custom Hooks
import { useUserProfile } from "@/hooks/userProfile";
// Styles
import useProfilePictureStyles from "@/styles/profilePicture.styles";

export default function ProfilePicture() {
  // User id
  const { id } = useLocalSearchParams();

  // Currently logged in user
  const { userUid } = useAuth();

  // Check if currently logged in user id is the same as the user id
  const isCurrentlyLoggedInUser = userUid === id;
  //const isCurrentlyLoggedInUser = false;

  // Router
  const router = useRouter();

  // Fecth user data from Firestore using TanStack Query
  const { data: user } = useUserProfile(id as string | null);

  // Styles
  const profilePictureStyles = useProfilePictureStyles();

  return (
    <View style={profilePictureStyles.container}>
      {/* Header */}
      <View style={profilePictureStyles.header}>
        {/* Back Button */}
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-sharp" size={24} color={COLORS.lightGrey} />
        </TouchableOpacity>

        {/* Option Button */}
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

      {/* Edit Button */}
      {isCurrentlyLoggedInUser && (
        <TouchableOpacity style={profilePictureStyles.editBtn}>
          <Text style={profilePictureStyles.editBtnText}>Edit</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
