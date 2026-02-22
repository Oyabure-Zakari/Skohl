import COLORS from "@/constants/colors";
import useEditPostStyles from "@/styles/editPost.styles";
import React, { RefObject } from "react";
import { KeyboardTypeOptions, Text, TextInput } from "react-native";

type InputFieldAndTitleProps = {
  title: string;
  ref: RefObject<TextInput | null>;
  defaultValue: string | undefined;
  onChangeText: (text: string) => string;
  keyboardType?: KeyboardTypeOptions | undefined;
  multiline?: boolean;
};

const InputFieldAndTitle: React.FC<InputFieldAndTitleProps> = ({
  title,
  ref,
  defaultValue,
  onChangeText,
  keyboardType,
  multiline,
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
        keyboardType={keyboardType}
        multiline={multiline}
      />
    </>
  );
};

export default InputFieldAndTitle;
