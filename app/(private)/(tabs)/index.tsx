import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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

import PostCardVertical from "@/components/reuseableComponents/PostsCardVertical";
import productCategories from "@/constants/postProductCategories";
import postsCollectionRef from "@/firebase/collectionRef/postsCollectionRef";
import { ProductPost } from "@/types/PostTypes";
import { ProductCategoryType } from "@/types/ProductCategoryType";
import { getDocs, orderBy, query, where } from "firebase/firestore";

export default function HomeScreen() {
  // Styles
  const reUseableStyles = useReuseableStyles();

  // States
  const [productPosts, setProductPosts] = useState<ProductPost[]>([]);
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

  // States
  const [isLoadingCreatedPosts, setIsLoadingCreatedPosts] = useState(true);

  useEffect(() => {
    fetchProductPosts();
  }, [activeProductCategory]);

  const fetchProductPosts = async () => {
    try {
      let q;

      if (activeProductCategory === "none") {
        // All products
        q = query(
          postsCollectionRef,
          where("postType", "==", "product"),
          orderBy("createdAt", "desc"),
        );
      } else {
        // Filtered by category
        q = query(
          postsCollectionRef,
          where("postType", "==", "product"),
          where("category", "==", activeProductCategory),
          orderBy("createdAt", "desc"),
        );
      }

      const snapshot = await getDocs(q);

      const fetchedPosts: ProductPost[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ProductPost[];

      setProductPosts(fetchedPosts);
    } catch (error: any) {
      console.error("Error fetching product posts:", error);
    } finally {
      setIsLoadingCreatedPosts(false);
    }
  };

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
      <FlatList
        data={productPosts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <PostCardVertical post={item} />}
        contentContainerStyle={{ paddingVertical: 16 }}
        showsVerticalScrollIndicator={false}
      />

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
