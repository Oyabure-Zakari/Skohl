import { Image } from "expo-image";
import React from "react";

import blurhash from "@/constants/expoBlurImage";
import IMAGES from "@/constants/images";

import useRegisterScreenStyles from "@/styles/registerScreen.styles";

type ProfileImageProps = {
  userImage: string;
};

const ProfileImage: React.FC<ProfileImageProps> = ({ userImage }) => {
  const registerStyles = useRegisterScreenStyles();

  return (
    <Image
      source={userImage ? { uri: userImage } : IMAGES.defaultAvatar}
      style={registerStyles.image}
      placeholder={{ blurhash }}
      contentFit="contain"
      transition={1000}
      alt="Avatar"
    />
  );
};

export default ProfileImage;
