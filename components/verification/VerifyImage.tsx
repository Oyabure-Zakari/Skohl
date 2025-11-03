import IMAGES from "@/constants/images";
import useReuseableStyles from "@/styles/reuable.styles";
import React from "react";
import { Image } from "react-native";

const VerifyImage = () => {
  const styles = useReuseableStyles();

  return <Image source={IMAGES.verify} style={styles.image} />;
};

export default VerifyImage;
