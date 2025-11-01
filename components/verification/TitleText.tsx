import styles from "@/styles/verification.styles";
import React from "react";
import { Text } from "react-native";

type TitleTextProps = {
  text: string;
};

const TitleText: React.FC<TitleTextProps> = ({ text }) => {
  return <Text style={styles.titleText}>{text}</Text>;
};

export default TitleText;
