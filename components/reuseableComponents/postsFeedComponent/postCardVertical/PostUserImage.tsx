import blurhash from "@/constants/expoBlurImage";
import usePostCardVerticalStyles from "@/styles/postCardVerticalStyles";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

type PostUserImageProps = {
  image: string | undefined;
  userUid: string | undefined;
};

const PostUserImage: React.FC<PostUserImageProps> = ({ image, userUid }) => {
  const postCardVerticalStyles = usePostCardVerticalStyles();
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.push(`/(private)/userProfilePicture/${userUid}`)}>
      <Image
        source={{ uri: image }}
        style={postCardVerticalStyles.userAvatar}
        placeholder={{ blurhash }}
        contentFit="contain"
        transition={1000}
        alt="Profile Picture"
      />
    </TouchableOpacity>
  );
};

export default PostUserImage;
