import COLORS from "@/constants/colors";
import useReuseableStyles from "@/styles/reuable.styles";
import React from "react";
import { TextInput } from "react-native";

type InputFieldProps = {
  value: string;
  placeholder: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
};

const InputField: React.FC<InputFieldProps> = ({
  value,
  placeholder,
  onChangeText,
}) => {
  const reuableStyles = useReuseableStyles();
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={COLORS.darkGrey}
      style={reuableStyles.textInputStyles}
    />
  );
};
export default InputField;
