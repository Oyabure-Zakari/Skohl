import blurhash from "@/constants/expoBlurImage";
import { useAuth } from "@/contexts/AuthContext";
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
  const router = useRouter();
  const { userUid: currentlyLoggedInUser } = useAuth();
  const postCardVerticalStyles = usePostCardVerticalStyles();

  const isLoggedInUser = userUid === currentlyLoggedInUser;

  const navigateToProfile = () => {
    if (isLoggedInUser) {
      router.push("/(private)/(tabs)/Profile");
    } else {
      //router.push("/(private)/(tabs)/Profile");
    }
  };

  return (
    <TouchableOpacity onPress={navigateToProfile}>
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
