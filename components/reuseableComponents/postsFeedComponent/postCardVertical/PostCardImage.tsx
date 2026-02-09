import blurhash from "@/constants/expoBlurImage";
import usePostCardVerticalStyles from "@/styles/postCardVerticalStyles";
import { Image } from "expo-image";
import React from "react";

type PostCardImageProps = {
  image: string | undefined;
};

const PostCardImage: React.FC<PostCardImageProps> = ({ image }) => {
  const postCardVerticalStyles = usePostCardVerticalStyles();

  return (
    <Image
      source={{ uri: image }}
      style={postCardVerticalStyles.productImage}
      placeholder={{ blurhash }}
      contentFit="cover"
      transition={1000}
      alt="Product Picture"
    />
  );
};

export default PostCardImage;
