import COLORS from "@/constants/colors";
import useRegisterScreenStyles from "@/styles/registerScreen.styles";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React from "react";
import { TouchableOpacity } from "react-native";

type EditPicButtonProps = {
  pickImage: () => Promise<void>;
};

const EditPicButton: React.FC<EditPicButtonProps> = ({ pickImage }) => {
  const registerStyles = useRegisterScreenStyles();
  return (
    <TouchableOpacity onPress={pickImage} style={registerStyles.editButton}>
      <FontAwesome5 name="pen-square" size={25} color={COLORS.purple} />
    </TouchableOpacity>
  );
};

export default EditPicButton;
