import useReuseableStyles from "@/styles/reuable.styles";
import React from "react";
import { Text } from "react-native";

type FormErrorTextProps = {
  error: string;
};

const FormErrorText: React.FC<FormErrorTextProps> = ({ error }) => {
  const reuableStyles = useReuseableStyles();
  return <Text style={reuableStyles.errorText}>{error}</Text>;
};

export default FormErrorText;
