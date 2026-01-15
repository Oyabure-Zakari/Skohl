import CustomButton from "@/components/reuseableComponents/CustomButton";
import cameraStyles from "@/styles/camera.styles";
import { PermissionResponse } from "expo-image-picker";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
// Styles

type GrantCameraPermissionProps = {
  requestPermission: () => Promise<PermissionResponse>;
};

const GrantCameraPermission: React.FC<GrantCameraPermissionProps> = ({ requestPermission }) => {
  return (
    <View style={cameraStyles.grantPermissionContainer}>
      <Text style={{ textAlign: "center" }}>We need your permission to use the camera</Text>
      <TouchableOpacity onPress={requestPermission}>
        <CustomButton text={"Grant Permission"} />
      </TouchableOpacity>
    </View>
  );
};

export default GrantCameraPermission;
