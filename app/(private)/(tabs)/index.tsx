// React
import React, { useCallback, useMemo, useRef, useState } from "react";
// React Native
import { Alert } from "react-native";
// Packages / Libraries
import BottomSheet from "@gorhom/bottom-sheet";
// Component
import PostsFeed from "@/components/reuseableComponents/postsFeedComponent/PostsFeed";
// Constants
import productCategories from "@/constants/postProductCategories";
// Hooks
import { useFetchPosts } from "@/hooks/fetchPosts";
// Types
import { EventCategoryType } from "@/types/EventCategoryType";
import { ProductCategoryType } from "@/types/ProductCategoryType";
import { ServiceCategoryType } from "@/types/ServiceCategoryType";

export default function HomeScreen() {
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
  const { posts, isLoadingPosts, isError, error } = useFetchPosts("product", activePostCategory);

  if (isError)
    return Alert.alert("Error", error?.message || "An error occurred while fetching posts.");

  return (
    <PostsFeed
      activePostCategory={activePostCategory}
      setActivePostCategory={setActivePostCategory}
      postCategories={productCategories}
      screen={"Home Screen"}
      isLoadingPosts={isLoadingPosts}
      posts={posts}
      sheetRef={sheetRef}
      snapPoints={snapPoints}
      activeBottomSheet={activeBottomSheet}
      setActiveBottomSheet={setActiveBottomSheet}
      handleSnapPress={handleSnapPress}
      screenText={"Products"}
    />
  );
}
