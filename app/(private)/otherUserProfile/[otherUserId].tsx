// React
import BottomSheetComponent from "@/components/bottomSheet/BottomSheetComponent";
import UserBio from "@/components/profile/UserBio";
import FloatingActionButton from "@/components/reuseableComponents/FloatingActionButton";
import PostsList from "@/components/reuseableComponents/postsFeedComponent/PostsList";
import COLORS from "@/constants/colors";
import blurhash from "@/constants/expoBlurImage";
import { useUserPosts } from "@/hooks/userPosts";
import { useUserProfile } from "@/hooks/userProfile";
import gestureHandlerRootViewStyle from "@/styles/gestureHandlerRootView.styles";
import useReuseableStyles from "@/styles/reuable.styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, View } from "moti";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";

import { GestureHandlerRootView } from "react-native-gesture-handler";

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
        <TouchableOpacity style={otherUserProfileStyles.chatBtn}>
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

const otherUserProfileStyles = StyleSheet.create({
  profileHeaderContainer: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  chatBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: COLORS.darkBlue,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    elevation: 6,
  },

  chatText: {
    color: COLORS.lightGrey,
    fontSize: 14,
    fontFamily: "Segoe_UI_Bold",
    textAlign: "center",
  },

  titleContainer: {
    backgroundColor: COLORS.purple,
    borderRadius: 5,
    padding: 5,
    marginTop: 10,
    width: 100,
    alignSelf: "center",
  },

  titleText: {
    color: COLORS.white,
    fontFamily: "Segoe_UI_Bold",
    fontSize: 12,
    textAlign: "center",
  },
});
