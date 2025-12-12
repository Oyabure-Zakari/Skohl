import blurhash from "@/constants/expoBlurImage";
import IMAGES from "@/constants/images";
import useReuseableStyles from "@/styles/reuable.styles";
import { Image } from "expo-image";
import React from "react";

const VerifyImage = () => {
  const styles = useReuseableStyles();

  return (
    <Image
      source={IMAGES.verify}
      style={styles.image}
      placeholder={{ blurhash }}
      contentFit="contain"
      transition={1000}
      alt="An illustration of a verified user"
    />
  );
};

export default VerifyImage;
