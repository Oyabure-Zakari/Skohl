import useReuseableStyles from "@/styles/reuable.styles";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type PostAndBookmarksBtnProps = {
  activeButton: "Posts" | "Bookmarks";
  setActiveButton: React.Dispatch<React.SetStateAction<"Posts" | "Bookmarks">>;
};

const PostAndBookmarksBtn: React.FC<PostAndBookmarksBtnProps> = ({
  activeButton,
  setActiveButton,
}) => {
  // Styles
  const reUseableStyles = useReuseableStyles();

  return (
    <View style={[reUseableStyles.buttonTypeContainer, { alignSelf: "center", marginTop: 10 }]}>
      {/* Posts Button */}
      <TouchableOpacity
        style={[
          activeButton === "Posts" ? reUseableStyles.activeButton : reUseableStyles.inactiveButton,
        ]}
        onPress={() => setActiveButton("Posts")}
      >
        <Text
          style={[
            activeButton === "Posts" ? reUseableStyles.activeText : reUseableStyles.inactiveText,
          ]}
        >
          Posts
        </Text>
      </TouchableOpacity>

      {/* Bookmarks Button */}
      <TouchableOpacity
        style={[
          activeButton === "Bookmarks"
            ? reUseableStyles.activeButton
            : reUseableStyles.inactiveButton,
        ]}
        onPress={() => setActiveButton("Bookmarks")}
      >
        <Text
          style={[
            activeButton === "Bookmarks"
              ? reUseableStyles.activeText
              : reUseableStyles.inactiveText,
          ]}
        >
          Bookmarks
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default PostAndBookmarksBtn;
