import useReuseableStyles from "@/styles/reuable.styles";
import React from "react";
import { Text } from "react-native";

type SubTitleTextProps = {
  text: string;
};

const SubTitleText: React.FC<SubTitleTextProps> = ({ text }) => {
  const styles = useReuseableStyles();
  return <Text style={styles.subTitleText}>{text}</Text>;
};

export default SubTitleText;
