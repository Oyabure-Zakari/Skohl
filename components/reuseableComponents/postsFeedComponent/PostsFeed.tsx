import BottomSheetComponent from "@/components/bottomSheet/BottomSheetComponent";
import OverlayActivityIndicator from "@/components/reuseableComponents/OverlayLoadingIndicator";
import COLORS from "@/constants/colors";
import gestureHandlerRootViewStyle from "@/styles/gestureHandlerRootView.styles";
import { EventCategoryType } from "@/types/EventCategoryType";
import { Post } from "@/types/PostTypes";
import { ProductCategoryType } from "@/types/ProductCategoryType";
import { ServiceCategoryType } from "@/types/ServiceCategoryType";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import FloatingActionButton from "../FloatingActionButton";
import PostCategoryButtons from "./postCardVertical/PostCategoryButtons";
import PostFeedHeader from "./PostFeedHeader";
import PostsList from "./PostsList";

type PostsFeedProps = {
  activePostCategory: ProductCategoryType | ServiceCategoryType | EventCategoryType;
  setActivePostCategory: React.Dispatch<
    React.SetStateAction<ProductCategoryType | ServiceCategoryType | EventCategoryType>
  >;
  postCategories: string[];
  screen: string;
  isLoadingPosts: boolean;
  posts: Post[];
  sheetRef: React.RefObject<BottomSheetMethods | null>;
  snapPoints: string[];
  activeBottomSheet: "Create Post" | "Send Feedback";
  setActiveBottomSheet: React.Dispatch<React.SetStateAction<"Create Post" | "Send Feedback">>;
  handleSnapPress: () => void;
  screenText: string;
  postFeedTitle: string;
  postFeedIllustration: string;
};

const PostsFeed: React.FC<PostsFeedProps> = ({
  activePostCategory,
  setActivePostCategory,
  postCategories,
  screen,
  isLoadingPosts,
  posts,
  sheetRef,
  snapPoints,
  activeBottomSheet,
  setActiveBottomSheet,
  handleSnapPress,
  screenText,
  postFeedTitle,
  postFeedIllustration,
}) => {
  return (
    <>
      <StatusBar style="light" backgroundColor={COLORS.darkBlue} />
      <GestureHandlerRootView style={gestureHandlerRootViewStyle.container}>
        {/* Header: User Name + User Image */}
        <PostFeedHeader screenText={screenText} />

        <View
          style={{
            paddingHorizontal: 16,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontFamily: "Segoe_UI_Bold",
              color: COLORS.darkBlue,
              fontSize: 20,
              lineHeight: 25,
            }}
          >
            {postFeedTitle}
          </Text>

          <Image
            source={postFeedIllustration}
            style={{ width: 140, height: 140 }}
            contentFit="contain"
            alt="Post feed illustration"
          />
        </View>

        {/* Category Buttons */}
        <PostCategoryButtons
          activePostCategory={activePostCategory}
          setActivePostCategory={setActivePostCategory}
          postCategories={postCategories}
          screen={screen}
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
};

export default PostsFeed;
