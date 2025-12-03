import COLORS from "@/constants/colors";
import useReuseableStyles from "@/styles/reuable.styles";
import InputFieldProps from "@/types/InputFieldProps ";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import React from "react";
import { TextInput, View } from "react-native";

const InputField: React.FC<InputFieldProps> = ({
  iconType,
  placeholder,
  secureTextEntry,
  onChangeText,
}) => {
  // Custom hook to apply resuseable style on component
  const reuableStyles = useReuseableStyles();

  return (
    <View
      style={{
        backgroundColor: COLORS.lightGrey,
        flexDirection: "row",
        borderRadius: 10,
      }}
    >
      {iconType === "person" && (
        <Octicons
          name="person"
          size={20}
          color={COLORS.darkGrey}
          style={{ alignSelf: "center", paddingLeft: 10 }}
        />
      )}

      {iconType === "padlock" && (
        <MaterialIcons
          name="lock-outline"
          size={20}
          color={COLORS.darkGrey}
          style={{ alignSelf: "center", paddingLeft: 10 }}
        />
      )}

      <TextInput
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.darkGrey}
        secureTextEntry={secureTextEntry}
        style={reuableStyles.textInputStyles}
      />
    </View>
  );
};
export default InputField;
