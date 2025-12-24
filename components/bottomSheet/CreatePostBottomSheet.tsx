// React
import React, { useState } from "react";
// React Native
import { Text, View } from "react-native";
// Packages
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
// Styles
import useCreatePostBottomSheetStyles from "@/styles/createPostBottomSheetStyles";
import useReuseableStyles from "@/styles/reuable.styles";
// Components
import PostEventForm from "./createPostComponent/PostEventForm";
import PostProductForm from "./createPostComponent/PostProductForm";
import PostServiceForm from "./createPostComponent/PostServicefForm";
import PostTypeButtonSection from "./createPostComponent/PostTypeButtonSection";

const CreatePostBottomSheet: React.FC = () => {
  // State
  const [postType, setPostType] = useState<"Post a Product" | "Post a Service" | "Post an Event">(
    "Post a Product"
  );

  // Styles
  const reuseableStyles = useReuseableStyles();
  const createPostStyles = useCreatePostBottomSheetStyles();

  return (
    <BottomSheetScrollView
      contentContainerStyle={createPostStyles.content}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={true}
      bounces={true}
      alwaysBounceVertical={true}
      nestedScrollEnabled={true}
      decelerationRate="fast"
      overScrollMode="always"
    >
      {/* Bottom Sheet Header */}
      <Text style={reuseableStyles.bottomSheetTitle}>Create Post</Text>
      <View style={reuseableStyles.bottomSheetDivider} />
      <Text style={reuseableStyles.bottomSheetSubTitle}>What would you like to post?</Text>

      {/* Post Type Section */}
      <PostTypeButtonSection postType={postType} setPostType={setPostType} />

      {/* Post Form Section */}
      {postType === "Post a Product" && <PostProductForm postType={postType} />}
      {postType === "Post a Service" && <PostServiceForm postType={postType} />}
      {postType === "Post an Event" && <PostEventForm postType={postType} />}
    </BottomSheetScrollView>
  );
};

export default CreatePostBottomSheet;
