import useReuseableStyles from "@/styles/reuable.styles";
import React from "react";
import { Text } from "react-native";

type TitleTextProps = {
  text: string;
};

const TitleText: React.FC<TitleTextProps> = ({ text }) => {
  const styles = useReuseableStyles();
  return <Text style={styles.titleText}>{text}</Text>;
};

export default TitleText;
