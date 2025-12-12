import blurhash from "@/constants/expoBlurImage";
import IMAGES from "@/constants/images";
import useReuseableStyles from "@/styles/reuable.styles";
import { Image } from "expo-image";
import React from "react";
const RegisterImage = () => {
  const reuaseableStyles = useReuseableStyles();
  return (
    <Image
      source={IMAGES.register}
      style={reuaseableStyles.image}
      placeholder={{ blurhash }}
      contentFit="contain"
      transition={1000}
      alt="An illustration of a young black woman using a tablet"
    />
  );
};

export default RegisterImage;
