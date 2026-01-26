import usePostCardStyles from "@/styles/postCardStyles";
import React from "react";
import { Text } from "react-native";

type PostDescriptionProps = {
  postDescripton: string;
};

const PostDescription: React.FC<PostDescriptionProps> = ({ postDescripton }) => {
  const postCardStyles = usePostCardStyles();
  return (
    <Text style={postCardStyles.postDescription} numberOfLines={4}>
      {postDescripton}
    </Text>
  );
};

export default PostDescription;
