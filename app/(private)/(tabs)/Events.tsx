// React
import React, { useCallback, useMemo, useRef, useState } from "react";
// React Native
import { Alert } from "react-native";
// Packages / Libraries
import BottomSheet from "@gorhom/bottom-sheet";
// Hooks
import { useFetchPosts } from "@/hooks/fetchPosts";
// Components
import PostsFeed from "@/components/reuseableComponents/postsFeedComponent/PostsFeed";
//Constants
import postEventCategories from "@/constants/postEventCategories";
// Types
import { EventCategoryType } from "@/types/EventCategoryType";
import { ProductCategoryType } from "@/types/ProductCategoryType";
import { ServiceCategoryType } from "@/types/ServiceCategoryType";

export default function EventScreen() {
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
  const { posts, isLoadingPosts, isError, error } = useFetchPosts("event", activePostCategory);

  if (isError)
    return Alert.alert("Error", error?.message || "An error occurred while fetching posts.");

  return (
    <PostsFeed
      activePostCategory={activePostCategory}
      setActivePostCategory={setActivePostCategory}
      postCategories={postEventCategories}
      screen={"Event Screen"}
      isLoadingPosts={isLoadingPosts}
      posts={posts}
      sheetRef={sheetRef}
      snapPoints={snapPoints}
      activeBottomSheet={activeBottomSheet}
      setActiveBottomSheet={setActiveBottomSheet}
      handleSnapPress={handleSnapPress}
    />
  );
}
