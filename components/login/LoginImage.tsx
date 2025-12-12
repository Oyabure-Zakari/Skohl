import blurhash from "@/constants/expoBlurImage";
import IMAGES from "@/constants/images";
import useReuseableStyles from "@/styles/reuable.styles";
import { Image } from "expo-image";
import React from "react";

const LoginImage = () => {
  const reuseableStyles = useReuseableStyles();
  return (
    <Image
      style={reuseableStyles.image}
      source={IMAGES.login}
      placeholder={{ blurhash }}
      contentFit="contain"
      transition={1000}
      alt="An illustration of a young black male using a laptop"
    />
  );
};

export default LoginImage;
