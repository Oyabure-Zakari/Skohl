import usePostCardStyles from "@/styles/postCardStyles";
import React from "react";
import { Text } from "react-native";

type PostPriceProps = {
  price: string;
};

const PostPrice: React.FC<PostPriceProps> = ({ price }) => {
  const postCardStyles = usePostCardStyles();

  return <Text style={postCardStyles.postPrice}>{price}</Text>;
};

export default PostPrice;
