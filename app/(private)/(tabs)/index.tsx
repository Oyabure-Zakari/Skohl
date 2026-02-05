import React, { useCallback, useMemo, useRef, useState } from "react";
import { Alert, FlatList, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import BottomSheet from "@gorhom/bottom-sheet";

import BottomSheetComponent from "@/components/bottomSheet/BottomSheetComponent";
import FloatingActionButton from "@/components/reuseableComponents/FloatingActionButton";

import gestureHandlerRootViewStyle from "@/styles/gestureHandlerRootView.styles";
import { useRouter } from "expo-router";

import HomeHeader from "@/components/home/HomeHeader";
import OverlayActivityIndicator from "@/components/reuseableComponents/OverlayLoadingIndicator";
import PostCardVertical from "@/components/reuseableComponents/postCardVertical/PostsCardVertical";
import ProductCategoryButtons from "@/components/reuseableComponents/postCardVertical/ProductCategoryButtons";
import productCategories from "@/constants/postProductCategories";
import { useFetchPosts } from "@/hooks/fetchPosts";
import useHomeStyles from "@/styles/homeStyles";
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

  // Hooks
  const router = useRouter();

  // Fetching post details via tanstack query + firebase onSnapshot listener (real-time updates)
  const { posts, isLoadingPosts, isError, error } = useFetchPosts("product", activeProductCategory);

  if (isError)
    return Alert.alert("Error", error?.message || "An error occurred while fetching posts.");

  return (
    <GestureHandlerRootView style={gestureHandlerRootViewStyle.container}>
      {/* Header: User Name + User Image */}
      <HomeHeader />

      {/* Divider*/}
      <View style={homeStyles.divider} />

      {/* Category Container */}
      <View style={homeStyles.categoryContainer}>
        {/* Category Title */}
        <Text style={homeStyles.categoryTitle}>Category</Text>
        {/* Category Buttons */}
        <ProductCategoryButtons
          activeProductCategory={activeProductCategory}
          setActiveProductCategory={setActiveProductCategory}
          productCategories={productCategories}
        />
      </View>

      {/* Product List */}
      {isLoadingPosts ? (
        <OverlayActivityIndicator />
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PostCardVertical post={item} />}
          contentContainerStyle={{ paddingVertical: 16 }}
          showsVerticalScrollIndicator={false}
        />
      )}

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
