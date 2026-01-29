import React from "react";
import { Text, useWindowDimensions } from "react-native";

type PostTitleProps = {
  title: string;
};

const PostTitle: React.FC<PostTitleProps> = ({ title }) => {
  const { fontScale } = useWindowDimensions();

  return (
    <Text
      numberOfLines={2}
      style={{
        width: "90%",
        fontSize: fontScale * 14,
        fontFamily: "Segoe_UI_Bold_Italic",
        paddingHorizontal: 10,
      }}
    >
      {title}
    </Text>
  );
};

export default PostTitle;
