import COLORS from "@/constants/colors";
import useEditPostStyles from "@/styles/editPost.styles";
import React, { RefObject } from "react";
import { Text, TextInput } from "react-native";

type InputFieldAndTitleProps = {
  title: string;
  ref: RefObject<TextInput | null>;
  defaultValue: string;
  onChangeText: (text: string) => string;
};

const InputFieldAndTitle: React.FC<InputFieldAndTitleProps> = ({
  title,
  ref,
  defaultValue,
  onChangeText,
}) => {
  const editPostStyles = useEditPostStyles();
  return (
    <>
      <Text style={editPostStyles.inputName}>{title}</Text>
      <TextInput
        ref={ref}
        defaultValue={defaultValue}
        onChangeText={onChangeText}
        style={editPostStyles.input}
        placeholderTextColor={COLORS.darkGrey}
      />
    </>
  );
};

export default InputFieldAndTitle;
