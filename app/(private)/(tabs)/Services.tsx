// React
import React, { useCallback, useMemo, useRef, useState } from "react";
// React Native
import { Alert } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// Expo
import { StatusBar } from "expo-status-bar";
// Packages / Libraries
import BottomSheet from "@gorhom/bottom-sheet";
// Component
import BottomSheetComponent from "@/components/bottomSheet/BottomSheetComponent";
import HomeHeader from "@/components/home/HomeHeader";
import FloatingActionButton from "@/components/reuseableComponents/FloatingActionButton";
import OverlayActivityIndicator from "@/components/reuseableComponents/OverlayLoadingIndicator";
import PostCategoryButtons from "@/components/reuseableComponents/postCardVertical/PostCategoryButtons";
import PostsList from "@/components/reuseableComponents/PostsList";
// Styles
import gestureHandlerRootViewStyle from "@/styles/gestureHandlerRootView.styles";
// Constants
import COLORS from "@/constants/colors";
import postServiceCategories from "@/constants/postServiceCategories";
// Hooks
import { useFetchPosts } from "@/hooks/fetchPosts";
// Types
import { EventCategoryType } from "@/types/EventCategoryType";
import { ProductCategoryType } from "@/types/ProductCategoryType";
import { ServiceCategoryType } from "@/types/ServiceCategoryType";

export default function ServiceScreen() {
  // States
  const [activeBottomSheet, setActiveBottomSheet] = useState<"Create Post" | "Send Feedback">(
    "Create Post",
  );
  const [activePostCategory, setActivePostCategory] = useState<
    ProductCategoryType | ServiceCategoryType | EventCategoryType
  >("none");

  // Refs
  const sheetRef = useRef<BottomSheet>(null);

  // Bottom Sheet snap points
  const snapPoints = useMemo(() => ["1%", "50%", "100%"], []);

  // Handlers
  const handleSnapPress = useCallback(() => {
    sheetRef.current?.snapToIndex(2);
  }, []);

  // Fetching post details via tanstack query + firebase onSnapshot listener (real-time updates)
  const { posts, isLoadingPosts, isError, error } = useFetchPosts("service", activePostCategory);

  if (isError)
    return Alert.alert("Error", error?.message || "An error occurred while fetching posts.");

  return (
    <>
      <StatusBar style="light" backgroundColor={COLORS.darkBlue} />
      <GestureHandlerRootView style={gestureHandlerRootViewStyle.container}>
        {/* Header: User Name + User Image */}
        <HomeHeader />

        {/* Category Buttons */}
        <PostCategoryButtons
          activePostCategory={activePostCategory}
          setActivePostCategory={setActivePostCategory}
          postCategories={postServiceCategories}
          screen={"Service Screen"}
        />

        {/* Product List */}
        {isLoadingPosts ? <OverlayActivityIndicator /> : <PostsList posts={posts} />}

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
    </>
  );
}
