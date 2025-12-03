import COLORS from "@/constants/colors";
import useReuseableStyles from "@/styles/reuable.styles";
import InputFieldProps from "@/types/InputFieldProps ";
import React from "react";
import { TextInput } from "react-native";

const InputField: React.FC<InputFieldProps> = ({ placeholder, secureTextEntry, onChangeText }) => {
  // Custom hook to apply resuseable style on component
  const reuableStyles = useReuseableStyles();

  return (
    <TextInput
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={COLORS.darkGrey}
      secureTextEntry={secureTextEntry}
      style={reuableStyles.textInputStyles}
    />
  );
};
export default InputField;
