import IMAGES from "@/constants/images";
import useRegisterScreenStyles from "@/styles/registerScreen.styles";
import React from "react";
import { Image } from "react-native";

const DefaultAvatar = () => {
  const registerStyles = useRegisterScreenStyles();
  return <Image source={IMAGES.defaultAvatar} style={registerStyles.image} />;
};

export default DefaultAvatar;
