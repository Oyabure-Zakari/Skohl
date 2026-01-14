import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { Dispatch, SetStateAction } from "react";
import { Text, TouchableOpacity } from "react-native";
import { MenuDivider, MenuItem } from "react-native-material-menu";

type FlashModesProps = {
  setFlashMode: Dispatch<SetStateAction<"auto" | "on" | "off">>;
  setIsMenuVisible: Dispatch<SetStateAction<boolean>>;
};

const FlashModes: React.FC<FlashModesProps> = ({ setFlashMode, setIsMenuVisible }) => {
  return (
    <>
      {/* Flash Auto */}
      <MenuItem>
        <TouchableOpacity
          onPress={() => {
            setFlashMode("auto");
            setIsMenuVisible(false);
          }}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <MaterialCommunityIcons name="flash-auto" size={24} color="black" />
          <Text> Auto</Text>
        </TouchableOpacity>
      </MenuItem>

      <MenuDivider />

      {/* Flash Off */}
      <MenuItem>
        <TouchableOpacity
          onPress={() => {
            setFlashMode("off");
            setIsMenuVisible(false);
          }}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <MaterialCommunityIcons name="flash-off-outline" size={24} color="black" />
          <Text>Flash Off</Text>
        </TouchableOpacity>
      </MenuItem>

      <MenuDivider />

      {/* Flash On */}
      <MenuItem>
        <TouchableOpacity
          onPress={() => {
            setFlashMode("on");
            setIsMenuVisible(false);
          }}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <MaterialCommunityIcons name="flash" size={24} color="black" />
          <Text>Flash On</Text>
        </TouchableOpacity>
      </MenuItem>
    </>
  );
};

export default FlashModes;
