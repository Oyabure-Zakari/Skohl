import COLORS from "@/constants/colors";
import useRegisterScreenStyles from "@/styles/registerScreen.styles";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React from "react";
import { TouchableOpacity } from "react-native";

const EditPicButton = () => {
  const registerStyles = useRegisterScreenStyles();
  return (
    <TouchableOpacity style={registerStyles.editButton}>
      <FontAwesome5 name="pen-square" size={25} color={COLORS.purple} />
    </TouchableOpacity>
  );
};

export default EditPicButton;
