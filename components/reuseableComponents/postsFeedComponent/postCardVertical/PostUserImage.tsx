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
  isInOtherUserProfile?: boolean | undefined; // Is to prevent the user from navigating to the other user's profile if we're already in the other user's profile
};

const PostUserImage: React.FC<PostUserImageProps> = ({
  image,
  userUid: otherUser,
  isInOtherUserProfile, // Is to prevent the user from navigating to the other user's profile if we're already in the other user's profile
}) => {
  const router = useRouter();
  const { userUid: currentlyLoggedInUser } = useAuth();
  const postCardVerticalStyles = usePostCardVerticalStyles();

  // Check if the user is the currently logged in user
  const isLoggedInUser = otherUser === currentlyLoggedInUser;

  const navigateToProfile = () => {
    if (isLoggedInUser) {
      // If the user is the currently logged in user, navigate to the Profile screen
      router.push("/(private)/(tabs)/Profile");
    } else if (otherUser && !isInOtherUserProfile) {
      // If the user is not the currently logged in user and is not in isInOtherUserProfile, navigate to the OtherUserProfile screen
      router.push(`/(private)/otherUserProfile/${otherUser}`);
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
