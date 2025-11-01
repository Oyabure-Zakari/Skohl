import styles from "@/styles/verification.styles";
import React from "react";
import { Text } from "react-native";

type SubTitleTextProps = {
  text: string;
};

const SubTitleText: React.FC<SubTitleTextProps> = ({ text }) => {
  return <Text style={styles.subTitleText}>{text}</Text>;
};

export default SubTitleText;
