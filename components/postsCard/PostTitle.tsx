import React from "react";
import { Text } from "react-native";

type PostTitleProps = {
  title: string;
};

const PostTitle: React.FC<PostTitleProps> = ({ title }) => {
  return (
    <Text
      numberOfLines={2}
      style={{ width: "90%", fontSize: 15, fontFamily: "Segoe_UI_Bold_Italic" }}
    >
      {title}
    </Text>
  );
};

export default PostTitle;
