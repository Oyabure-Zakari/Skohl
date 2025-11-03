import IMAGES from "@/constants/images";
import useReuseableStyles from "@/styles/reuable.styles";
import React from "react";
import { Image } from "react-native";
const RegisterImage = () => {
  const reuaseableStyles = useReuseableStyles();
  return <Image source={IMAGES.register} style={reuaseableStyles.image} />;
};

export default RegisterImage;
