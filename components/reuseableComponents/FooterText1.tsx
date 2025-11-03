import useReuseableStyles from "@/styles/reuable.styles";
import React from "react";
import { Text } from "react-native";

type FooterTextProps = {
  text: string;
};

const FooterText1: React.FC<FooterTextProps> = ({ text }) => {
  const styles = useReuseableStyles();
  return <Text style={styles.footerText1}>{text}</Text>;
};

export default FooterText1;
