import blurhash from "@/constants/expoBlurImage";
import { Image } from "expo-image";
import React from "react";

type PostImageProps = {
  postImage: string;
};

const PostImage: React.FC<PostImageProps> = ({ postImage }) => {
  return (
    <Image
      source={{ uri: postImage }}
      style={{ width: "100%", height: 120 }}
      placeholder={{ blurhash }}
      transition={300}
      contentFit="cover"
    />
  );
};

export default PostImage;
