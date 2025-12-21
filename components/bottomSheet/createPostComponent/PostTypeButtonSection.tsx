import useCreatePostBottomSheetStyles from "@/styles/createPostBottomSheetStyles";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type PostTypeButtonSectionProps = {
  postType: "Post a Product" | "Post a Service" | "Post an Event";
  setPostType: React.Dispatch<
    React.SetStateAction<"Post a Product" | "Post a Service" | "Post an Event">
  >;
};

const PostTypeButtonSection: React.FC<PostTypeButtonSectionProps> = ({ postType, setPostType }) => {
  // Styles
  const createPostStyles = useCreatePostBottomSheetStyles();

  return (
    <View style={createPostStyles.postTypeContainer}>
      {/* Post Product Button */}
      <TouchableOpacity
        style={[
          postType === "Post a Product"
            ? createPostStyles.activeButton
            : createPostStyles.inactiveButton,
        ]}
        onPress={() => setPostType("Post a Product")}
      >
        <Text
          style={[
            postType === "Post a Product"
              ? createPostStyles.activeText
              : createPostStyles.inactiveText,
          ]}
        >
          Post a Product
        </Text>
      </TouchableOpacity>

      {/* Post Service Button */}
      <TouchableOpacity
        style={[
          postType === "Post a Service"
            ? createPostStyles.activeButton
            : createPostStyles.inactiveButton,
        ]}
        onPress={() => setPostType("Post a Service")}
      >
        <Text
          style={[
            postType === "Post a Service"
              ? createPostStyles.activeText
              : createPostStyles.inactiveText,
          ]}
        >
          Post a Service
        </Text>
      </TouchableOpacity>

      {/* Post Event Button */}
      <TouchableOpacity
        style={[
          postType === "Post an Event"
            ? createPostStyles.activeButton
            : createPostStyles.inactiveButton,
        ]}
        onPress={() => setPostType("Post an Event")}
      >
        <Text
          style={[
            postType === "Post an Event"
              ? createPostStyles.activeText
              : createPostStyles.inactiveText,
          ]}
        >
          Post an Event
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PostTypeButtonSection;
