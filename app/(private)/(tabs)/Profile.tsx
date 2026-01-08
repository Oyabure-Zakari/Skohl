// React
import { useCallback, useMemo, useRef, useState } from "react";
// React Native
import { ScrollView, View } from "react-native";
// Packages/Libraries
import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// Components
import BottomSheetComponent from "@/components/bottomSheet/BottomSheetComponent";
import Header from "@/components/profile/Header";
import NoPostsOrBookmarks from "@/components/profile/NoPostsOrBookmarks";
import PostAndBookmarksBtn from "@/components/profile/PostAndBookmarksBtn";
import UserBio from "@/components/profile/UserBio";
import FloatingActionButton from "@/components/reuseableComponents/FloatingActionButton";
// Styles
import useReuseableStyles from "@/styles/reuable.styles";
// Custom Hook
import { useUserProfile } from "@/hooks/userProfile";

export default function ProfileScreen() {
  // States
  const [activeButton, setActiveButton] = useState<"Posts" | "Bookmarks">("Posts");
  const [activeBottomSheet, setActiveBottomSheet] = useState<"Create Post" | "Send Feedback">(
    "Create Post"
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
  const { data: user, isPending: isLoading } = useUserProfile();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Header */}
      <Header user={user} />

      {/* User Bio */}
      <UserBio isLoading={isLoading} user={user} />

      {/* Posts and Bookmarks Buttons */}
      <PostAndBookmarksBtn activeButton={activeButton} setActiveButton={setActiveButton} />

      {/* Divider*/}
      <View style={reUseableStyles.bottomSheetDivider} />

      {/* Content */}
      <ScrollView>
        {/* No Posts Or Bookmarks */}
        <NoPostsOrBookmarks activeButton={activeButton} />
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
