// React
import React from "react";
// React Native
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
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
import { StatusBar } from "expo-status-bar";
import Animated, { FadeInDown } from "react-native-reanimated";

// Custom animated components
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

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
    <>
      {/* Status Bar */}
      <StatusBar style="light" backgroundColor={COLORS.darkBlue} />
      {/* Container */}
      <ScrollView style={profilePictureStyles.container}>
        {/* Header */}
        <View style={profilePictureStyles.header}>
          {/* Back Button */}
          <TouchableOpacity onPress={() => router.push("/(private)/(tabs)/Profile")}>
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
          alt="Profile Picture"
        />

        {/* Edit Button */}
        {isCurrentlyLoggedInUser && (
          <AnimatedTouchableOpacity
            entering={FadeInDown.delay(400)}
            style={profilePictureStyles.editBtn}
            onPress={() => router.push("/(private)/EditProfile")}
          >
            <Text style={profilePictureStyles.editBtnText}>Edit</Text>
          </AnimatedTouchableOpacity>
        )}
      </ScrollView>
    </>
  );
}
