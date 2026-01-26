import usePostCardStyles from "@/styles/postCardStyles";
import React from "react";
import { Text } from "react-native";

type PostCatergoryProps = {
  catergory: string;
};

const PostCatergory: React.FC<PostCatergoryProps> = ({ catergory }) => {
  const postCardStyles = usePostCardStyles();

  return (
    <Text numberOfLines={1} style={postCardStyles.postCatergory}>
      ℹ️ {catergory}
    </Text>
  );
};

export default PostCatergory;
