import COLORS from "@/constants/colors";
import LOTTIES from "@/constants/lottie";
import useProfileScreenStyles from "@/styles/profile.styles";
import LottieView from "lottie-react-native";
import React from "react";
import { Text, useWindowDimensions, View } from "react-native";

type PostAndBookmarksBtnProps = {
  activeButton: "Posts" | "Bookmarks";
};

const NoPostsOrBookmarks: React.FC<PostAndBookmarksBtnProps> = ({ activeButton }) => {
  // Styles
  const profileStyles = useProfileScreenStyles();

  const { fontScale } = useWindowDimensions();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        //backgroundColor: "red",
      }}
    >
      <LottieView
        autoPlay
        speed={1.5}
        style={profileStyles.lottieStyle}
        source={LOTTIES.nothingFound}
      />
      <Text
        style={{ fontFamily: "Segoe_UI_Bold", fontSize: fontScale * 16, color: COLORS.darkGrey }}
      >
        No {activeButton === "Posts" ? "posts" : "bookmarks"} found.
      </Text>
    </View>
  );
};

export default NoPostsOrBookmarks;
