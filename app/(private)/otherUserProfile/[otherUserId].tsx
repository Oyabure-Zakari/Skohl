// React
import BottomSheetComponent from "@/components/bottomSheet/BottomSheetComponent";
import Header from "@/components/profile/Header";
import UserBio from "@/components/profile/UserBio";
import FloatingActionButton from "@/components/reuseableComponents/FloatingActionButton";
import PostsList from "@/components/reuseableComponents/postsFeedComponent/PostsList";
import { useUserPosts } from "@/hooks/userPosts";
import { useUserProfile } from "@/hooks/userProfile";
import gestureHandlerRootViewStyle from "@/styles/gestureHandlerRootView.styles";
import useReuseableStyles from "@/styles/reuable.styles";
import BottomSheet from "@gorhom/bottom-sheet";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, View } from "moti";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Alert } from "react-native";

import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function OtherUserProfile() {
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

  if (isError && error) return Alert.alert("Error", error.message);

  return (
    <GestureHandlerRootView style={gestureHandlerRootViewStyle.container}>
      {/* Header */}
      <Header user={user} />

      <ScrollView>
        {/* User Bio */}
        <UserBio isLoading={isLoading} user={user} />

        {/* Posts Button */}

        {/* Divider*/}
        <View style={reUseableStyles.bottomSheetDivider} />

        {/* Created Posts  */}
        {!isLoadingCreatedPosts && posts.length > 0 && <PostsList posts={posts} />}
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
