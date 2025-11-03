import IMAGES from "@/constants/images";
import useReuseableStyles from "@/styles/reuable.styles";
import React from "react";
import { Image } from "react-native";

const LoginImage = () => {
  const reuseableStyles = useReuseableStyles();
  return <Image style={reuseableStyles.image} source={IMAGES.login} />;
};

export default LoginImage;
