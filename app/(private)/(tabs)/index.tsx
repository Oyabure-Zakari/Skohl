import React, { useCallback, useMemo, useRef, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";

import BottomSheet from "@gorhom/bottom-sheet";

import BottomSheetComponent from "@/components/bottomSheet/BottomSheetComponent";
import FloatingActionButton from "@/components/reuseableComponents/FloatingActionButton";

import COLORS from "@/constants/colors";
import blurhash from "@/constants/expoBlurImage";
import gestureHandlerRootViewStyle from "@/styles/gestureHandlerRootView.styles";
import useReuseableStyles from "@/styles/reuable.styles";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

import OverlayActivityIndicator from "@/components/reuseableComponents/OverlayLoadingIndicator";
import PostCardVertical from "@/components/reuseableComponents/PostsCardVertical";
import productCategories from "@/constants/postProductCategories";
import { useFetchPosts } from "@/hooks/fetchPosts";
import { ProductCategoryType } from "@/types/ProductCategoryType";

export default function HomeScreen() {
  // Styles
  const reUseableStyles = useReuseableStyles();

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
  const { posts, isLoadingPosts, isError, error } = useFetchPosts(activeProductCategory);

  if (isError)
    return Alert.alert("Error", error?.message || "An error occurred while fetching posts.");

  return (
    <GestureHandlerRootView style={gestureHandlerRootViewStyle.container}>
      {/* Header */}
      <View style={homeStyles.header}>
        {/* User Name */}
        <Text style={homeStyles.userName}>Hey,{"\n"}Halima</Text>
        {/* User Image */}
        <TouchableOpacity onPress={() => router.push("/(private)/(tabs)/Profile")}>
          <Image
            source={{ uri: "https://i.pravatar.cc/300" }}
            style={{ width: 50, height: 50, borderRadius: 25 }}
            placeholder={{ blurhash }}
            contentFit="contain"
            transition={1000}
            alt="Profile Picture"
          />
        </TouchableOpacity>
      </View>

      {/* Divider*/}
      <View style={homeStyles.divider} />

      {/* Category Container */}
      <View style={homeStyles.categoryContainer}>
        {/* Category Title */}
        <Text style={homeStyles.categoryTitle}>Category</Text>
        {/* Category Buttons */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 6 }}
        >
          {/* Category Buttons */}
          {productCategories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                activeProductCategory === category
                  ? reUseableStyles.activeButton
                  : reUseableStyles.inactiveButton,
              ]}
              onPress={() => setActiveProductCategory(category as ProductCategoryType)}
            >
              <Text
                style={[
                  activeProductCategory === category
                    ? reUseableStyles.activeText
                    : reUseableStyles.inactiveText,
                ]}
              >
                {category === "none" ? "All" : category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
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

const homeStyles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  userName: {
    fontSize: 18,
    fontFamily: "Segoe_UI_Bold",
    color: COLORS.darkBlue,
  },

  divider: {
    width: "100%",
    height: 2,
    backgroundColor: COLORS.lightGrey,
    marginTop: 10,
  },

  categoryContainer: {
    marginTop: 20,
    paddingHorizontal: 4,
  },

  categoryTitle: {
    fontSize: 18,
    fontFamily: "Segoe_UI_Bold",
    color: COLORS.purple,
    paddingHorizontal: 16,
    marginBottom: 6,
  },
});
