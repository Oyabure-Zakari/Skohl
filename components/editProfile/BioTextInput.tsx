import COLORS from "@/constants/colors";
import useEditProfileStyles from "@/styles/editProfile.styles";
import React from "react";
import { TextInput } from "react-native";

type BioTextInputProps = {
  textInputRef: React.RefObject<TextInput | null>;
  bioMaxLength: number;
  user: any;
  userBioTextRef: React.RefObject<any>;
};

const BioTextInput: React.FC<BioTextInputProps> = ({
  textInputRef,
  bioMaxLength,
  user,
  userBioTextRef,
}) => {
  // Styles
  const editProfileStyles = useEditProfileStyles();
  return (
    <TextInput
      ref={textInputRef}
      placeholder="Enter your bio here..."
      multiline
      maxLength={bioMaxLength}
      numberOfLines={5.1}
      textAlignVertical="top"
      placeholderTextColor={COLORS.darkGrey}
      style={editProfileStyles.textInput}
      defaultValue={user?.bio}
      onChangeText={(text) => (userBioTextRef.current = text)}
    />
  );
};

export default BioTextInput;
