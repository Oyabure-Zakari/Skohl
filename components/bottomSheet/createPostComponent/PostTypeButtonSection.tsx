import useReuseableStyles from "@/styles/reuable.styles";
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
  const reUseableStyles = useReuseableStyles();

  return (
    <View style={reUseableStyles.buttonTypeContainer}>
      {/* Post Product Button */}
      <TouchableOpacity
        style={[
          postType === "Post a Product"
            ? reUseableStyles.activeButton
            : reUseableStyles.inactiveButton,
        ]}
        onPress={() => setPostType("Post a Product")}
      >
        <Text
          style={[
            postType === "Post a Product"
              ? reUseableStyles.activeText
              : reUseableStyles.inactiveText,
          ]}
        >
          Post a Product
        </Text>
      </TouchableOpacity>

      {/* Post Service Button */}
      <TouchableOpacity
        style={[
          postType === "Post a Service"
            ? reUseableStyles.activeButton
            : reUseableStyles.inactiveButton,
        ]}
        onPress={() => setPostType("Post a Service")}
      >
        <Text
          style={[
            postType === "Post a Service"
              ? reUseableStyles.activeText
              : reUseableStyles.inactiveText,
          ]}
        >
          Post a Service
        </Text>
      </TouchableOpacity>

      {/* Post Event Button */}
      <TouchableOpacity
        style={[
          postType === "Post an Event"
            ? reUseableStyles.activeButton
            : reUseableStyles.inactiveButton,
        ]}
        onPress={() => setPostType("Post an Event")}
      >
        <Text
          style={[
            postType === "Post an Event"
              ? reUseableStyles.activeText
              : reUseableStyles.inactiveText,
          ]}
        >
          Post an Event
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PostTypeButtonSection;
