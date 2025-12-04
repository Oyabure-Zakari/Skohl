import IMAGES from "@/constants/images";
import useRegisterScreenStyles from "@/styles/registerScreen.styles";
import React from "react";
import { Image } from "react-native";

type ProfileImageProps = {
  userImage: string;
};

const ProfileImage: React.FC<ProfileImageProps> = ({ userImage }) => {
  const registerStyles = useRegisterScreenStyles();

  return (
    <Image
      source={userImage ? { uri: userImage } : IMAGES.defaultAvatar}
      style={registerStyles.image}
    />
  );
};

export default ProfileImage;
