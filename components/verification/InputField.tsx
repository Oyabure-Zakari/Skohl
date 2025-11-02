import COLORS from "@/constants/colors";
import TEXTINPUTSTYLES from "@/constants/textInputStyles";
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
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={COLORS.darkGrey}
      style={{ ...TEXTINPUTSTYLES }}
    />
  );
};

export default InputField;
