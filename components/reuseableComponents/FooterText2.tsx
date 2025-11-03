import useReuseableStyles from "@/styles/reuable.styles";
import React from "react";
import { Text } from "react-native";

type FooterTextProps = {
  text: string;
};

const FooterText2: React.FC<FooterTextProps> = ({ text }) => {
  const reusableStyles = useReuseableStyles();
  return <Text style={reusableStyles.footerText2}>{text}</Text>;
};

export default FooterText2;
