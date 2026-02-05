// React
import React, { useCallback, useMemo, useRef, useState } from "react";
// React Native
import { Alert } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// Packages / Libraries
import BottomSheet from "@gorhom/bottom-sheet";
// Component
import BottomSheetComponent from "@/components/bottomSheet/BottomSheetComponent";
import HomeHeader from "@/components/home/HomeHeader";
import PostsList from "@/components/home/PostsList";
import FloatingActionButton from "@/components/reuseableComponents/FloatingActionButton";
import OverlayActivityIndicator from "@/components/reuseableComponents/OverlayLoadingIndicator";
import ProductCategoryButtons from "@/components/reuseableComponents/postCardVertical/ProductCategoryButtons";
// Styles
import gestureHandlerRootViewStyle from "@/styles/gestureHandlerRootView.styles";
import useHomeStyles from "@/styles/homeStyles";
// Constants
import productCategories from "@/constants/postProductCategories";
// Hooks
import { useFetchPosts } from "@/hooks/fetchPosts";
// Types
import { ProductCategoryType } from "@/types/ProductCategoryType";

export default function HomeScreen() {
  // Styles
  const homeStyles = useHomeStyles();

  // States
  const [activeBottomSheet, setActiveBottomSheet] = useState<"Create Post" | "Send Feedback">(
    "Create Post",
  );
  const [activeProductCategory, setActiveProductCategory] = useState<ProductCategoryType>("none");

  // Refs
  const sheetRef = useRef<BottomSheet>(null);

  // Bottom Sheet snap points
  const snapPoints = useMemo(() => ["1%", "50%", "100%"], []);

  // Handlers
  const handleSnapPress = useCallback(() => {
    sheetRef.current?.snapToIndex(2);
  }, []);

  // Fetching post details via tanstack query + firebase onSnapshot listener (real-time updates)
  const { posts, isLoadingPosts, isError, error } = useFetchPosts("product", activeProductCategory);

  if (isError)
    return Alert.alert("Error", error?.message || "An error occurred while fetching posts.");

  return (
    <GestureHandlerRootView style={gestureHandlerRootViewStyle.container}>
      {/* Header: User Name + User Image */}
      <HomeHeader />

      {/* Category Buttons */}
      <ProductCategoryButtons
        activeProductCategory={activeProductCategory}
        setActiveProductCategory={setActiveProductCategory}
        productCategories={productCategories}
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
  );
}
