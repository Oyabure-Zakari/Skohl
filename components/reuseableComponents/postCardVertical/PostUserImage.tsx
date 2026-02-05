import blurhash from "@/constants/expoBlurImage";
import usePostCardVerticalStyles from "@/styles/postCardVerticalStyles";
import { Image } from "expo-image";
import React from "react";

type PostUserImageProps = {
  image: string | undefined;
};

const PostUserImage: React.FC<PostUserImageProps> = ({ image }) => {
  const postCardVerticalStyles = usePostCardVerticalStyles();
  return (
    <Image
      source={{ uri: image }}
      style={postCardVerticalStyles.userAvatar}
      placeholder={{ blurhash }}
      contentFit="contain"
      transition={1000}
      alt="Profile Picture"
    />
  );
};

export default PostUserImage;
