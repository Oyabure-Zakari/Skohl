import COLORS from "@/constants/colors";
import React from "react";
import { TextInput } from "react-native";

type InputFieldProps = {
  placeholder: string;
};

const InputField: React.FC<InputFieldProps> = ({ placeholder }) => {
  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={COLORS.darkGrey}
      style={{
        color: COLORS.darkGrey,
        fontFamily: "Segoe_UI_Bold",
        backgroundColor: COLORS.lightGrey,
        borderRadius: 10,
        paddingHorizontal: 16,
        marginBottom: 20,
      }}
    />
  );
};

export default InputField;
