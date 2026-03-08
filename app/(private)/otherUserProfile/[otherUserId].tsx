// React
import React, { useCallback, useMemo, useRef, useState } from "react";
// React Native
import { Alert, Text, TouchableOpacity } from "react-native";
// Expo
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
// Packages / Libraries
import BottomSheet from "@gorhom/bottom-sheet";
import { ScrollView, View } from "moti";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// Components
import BottomSheetComponent from "@/components/bottomSheet/BottomSheetComponent";
import UserBio from "@/components/profile/UserBio";
import FloatingActionButton from "@/components/reuseableComponents/FloatingActionButton";
import PostsList from "@/components/reuseableComponents/postsFeedComponent/PostsList";
// Constants
import COLORS from "@/constants/colors";
import blurhash from "@/constants/expoBlurImage";
// Hooks
import { useUserPosts } from "@/hooks/userPosts";
import { useUserProfile } from "@/hooks/userProfile";
// Styles
import gestureHandlerRootViewStyle from "@/styles/gestureHandlerRootView.styles";
import useOtherUserProfileStyles from "@/styles/otherUserProfile.styles";
import useReuseableStyles from "@/styles/reuable.styles";

export default function OtherUserProfile() {
  // Router
  const router = useRouter();

  // User id
  const { otherUserId } = useLocalSearchParams();

  // States
  const [activeBottomSheet, setActiveBottomSheet] = useState<"Create Post" | "Send Feedback">(
    "Create Post",
  );

  // Refs
  const sheetRef = useRef<BottomSheet>(null);

  // Styles
  const reUseableStyles = useReuseableStyles();

  // Bottom Sheet snap points
  const snapPoints = useMemo(() => ["1%", "50%", "100%"], []);

  // Handlers
  const handleSnapPress = useCallback(() => {
    sheetRef.current?.snapToIndex(2);
  }, []);

  // Fetch user via TanStack Query instead of local state
  const { data: user, isPending: isLoading } = useUserProfile(otherUserId as string);

  // Custom hook to manage the posts data (caching, loading, error states, real-time listener)
  const { posts, isLoadingCreatedPosts, isError, error } = useUserPosts(otherUserId as string);

  // Is to prevent the user from navigating to the other user's profile if we're already in the other user's profile
  const isInOtherUserProfile = true;

  // Styles
  const otherUserProfileStyles = useOtherUserProfileStyles();

  if (isError && error) return Alert.alert("Error", error.message);

  return (
    <GestureHandlerRootView style={gestureHandlerRootViewStyle.container}>
      {/* Header */}
      <View style={otherUserProfileStyles.profileHeaderContainer}>
        {/* Profile Image */}
        <TouchableOpacity onPress={() => router.push(`/(private)/userProfilePicture/${user?.uid}`)}>
          <Image
            source={{ uri: user?.image }}
            style={{ width: 80, height: 80, borderRadius: 50 }}
            placeholder={{ blurhash: blurhash }}
            contentFit="contain"
            transition={1000}
            alt="Profile Picture"
          />
        </TouchableOpacity>

        {/* Chat Button */}
        <TouchableOpacity
          style={otherUserProfileStyles.chatBtn}
          onPress={() => router.push(`/(private)/chatRoom/${otherUserId as string}`)}
        >
          <MaterialCommunityIcons name="chat-outline" size={20} color={COLORS.white} />
          <Text style={otherUserProfileStyles.chatText}>Chat</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* User Bio */}
        <UserBio isLoading={isLoading} user={user} />

        {/* Title */}
        <View style={otherUserProfileStyles.titleContainer}>
          <Text style={otherUserProfileStyles.titleText}>Posts</Text>
        </View>

        {/* Divider*/}
        <View style={reUseableStyles.bottomSheetDivider} />

        {/* Created Posts  */}
        {!isLoadingCreatedPosts && (
          <PostsList posts={posts} isInOtherUserProfile={isInOtherUserProfile} />
        )}
      </ScrollView>

      {/* Bottom Sheet */}
      <BottomSheetComponent
        sheetRef={sheetRef}
        snapPoints={snapPoints}
        activeBottomSheet={activeBottomSheet}
      />

      {/* Floating Action Button */}
      <FloatingActionButton
        setActiveBottomSheet={setActiveBottomSheet}
        handleSnapPress={handleSnapPress}
      />
    </GestureHandlerRootView>
  );
}
