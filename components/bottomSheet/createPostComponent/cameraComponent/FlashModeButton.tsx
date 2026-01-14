import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { Dispatch, SetStateAction } from "react";
import { TouchableOpacity } from "react-native";

type FlashModeButtonProps = {
  setIsMenuVisible: Dispatch<SetStateAction<boolean>>;
  flashMode: "on" | "off" | "auto";
};

const FlashModeButton: React.FC<FlashModeButtonProps> = ({ setIsMenuVisible, flashMode }) => {
  return (
    <TouchableOpacity onPress={() => setIsMenuVisible(true)} style={{ padding: 16 }}>
      {flashMode === "auto" && <MaterialCommunityIcons name="flash-auto" size={24} color="white" />}
      {flashMode === "off" && (
        <MaterialCommunityIcons name="flash-off-outline" size={24} color="white" />
      )}
      {flashMode === "on" && <MaterialCommunityIcons name="flash" size={24} color="white" />}
    </TouchableOpacity>
  );
};

export default FlashModeButton;
