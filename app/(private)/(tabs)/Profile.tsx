// React
import { useCallback, useMemo, useRef, useState } from "react";
// React Native
import { Alert, ScrollView, View } from "react-native";
// Packages/Libraries
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// Components
import BookmarksLists from "@/components/bookmarkComponents/BookmarksLists";
import BottomSheetComponent from "@/components/bottomSheet/BottomSheetComponent";
import Header from "@/components/profile/Header";
import NoPostsOrBookmarks from "@/components/profile/NoPostsOrBookmarks";
import PostAndBookmarksBtn from "@/components/profile/PostAndBookmarksBtn";
import UserBio from "@/components/profile/UserBio";
import FloatingActionButton from "@/components/reuseableComponents/FloatingActionButton";
import PostsList from "@/components/reuseableComponents/postsFeedComponent/PostsList";
// Styles
import gestureHandlerRootViewStyle from "@/styles/gestureHandlerRootView.styles";
import useReuseableStyles from "@/styles/reuable.styles";
// Contexts
import { useAuth } from "@/contexts/AuthContext";
// Custom Hook
import useFetchBookmarks from "@/hooks/fetchBookmarks";
import { useUserPosts } from "@/hooks/userPosts";
import { useUserProfile } from "@/hooks/userProfile";

export default function ProfileScreen() {
  // Currently logged in user
  const { userUid } = useAuth();

  // States
  const [activeButton, setActiveButton] = useState<"Posts" | "Bookmarks">("Posts");
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
  const { data: user, isPending: isLoading } = useUserProfile(userUid);

  // Custom hook to manage the posts data (caching, loading, error states, real-time listener)
  const { posts, isLoadingCreatedPosts, isError, error } = useUserPosts(userUid);

  // Fetching bookmarkIds via tanstack query + firebase onSnapshot listener (real-time updates)
  const { bookmarks, isLoadingBookmarks, isBookmarksError, bookmarksError } =
    useFetchBookmarks(userUid);

  // Error handling
  if ((isError || isBookmarksError) && (error || bookmarksError))
    return Alert.alert("Error", (error || bookmarksError)?.message);

  return (
    <GestureHandlerRootView style={gestureHandlerRootViewStyle.container}>
      {/* Header */}
      <Header user={user} />

      <ScrollView>
        {/* User Bio */}
        <UserBio isLoading={isLoading} user={user} />

        {/* Posts and Bookmarks Buttons */}
        <PostAndBookmarksBtn activeButton={activeButton} setActiveButton={setActiveButton} />

        {/* Divider*/}
        <View style={reUseableStyles.bottomSheetDivider} />

        {/* No Posts Or Bookmarks */}
        {posts.length === 0 && <NoPostsOrBookmarks activeButton={activeButton} />}

        {/* Created Posts  */}
        {activeButton === "Posts" && !isLoadingCreatedPosts && <PostsList posts={posts} />}

        {/* Bookmarks */}
        {activeButton === "Bookmarks" && !isLoadingBookmarks && (
          <BookmarksLists bookmarks={bookmarks} />
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
