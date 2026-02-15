import COLORS from "@/constants/colors";
import usePostCardStyles from "@/styles/postCardStyles";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

type PropsType = {
  handleDeletePost: () => void;
  isDeletingPost: boolean;
};

const PostCardVerticalDeleteBtn: React.FC<PropsType> = ({ handleDeletePost, isDeletingPost }) => {
  const postCardStyles = usePostCardStyles();
  return (
    <TouchableOpacity
      onPress={handleDeletePost}
      disabled={isDeletingPost}
      style={postCardStyles.deletePostContainer}
    >
      {isDeletingPost ? (
        <ActivityIndicator size="small" color={COLORS.lightGrey} />
      ) : (
        <Text style={postCardStyles.deleteText}>Delete</Text>
      )}
    </TouchableOpacity>
  );
};

export default PostCardVerticalDeleteBtn;
