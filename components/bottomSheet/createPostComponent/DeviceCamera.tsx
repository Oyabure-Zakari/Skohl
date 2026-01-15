// React
import { Dispatch, SetStateAction, useRef, useState } from "react";
// React Native
import { View } from "react-native";
// Expo
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { StatusBar } from "expo-status-bar";
// Packages/Libraries
import { Menu } from "react-native-material-menu";
// Components
import FlashModeButton from "./cameraComponent/FlashModeButton";
import FlashModes from "./cameraComponent/FlashModes";
import GrantCameraPermission from "./cameraComponent/GrantCameraPermission";
import ShutterContents from "./cameraComponent/ShutterContents";
// Styles
import cameraStyles from "@/styles/camera.styles";

type DeviceCameraProps = {
  setIsCameraOpen: Dispatch<SetStateAction<boolean>>;
};

const DeviceCamera: React.FC<DeviceCameraProps> = ({ setIsCameraOpen }) => {
  // States
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [flashMode, setFlashMode] = useState<"on" | "off" | "auto">("off");
  const [facing, setFacing] = useState<CameraType>("back");

  // Refs
  const cameraRef = useRef<CameraView>(null);

  // Expo Camera Hooks
  const [permission, requestPermission] = useCameraPermissions();

  // If no permission
  if (!permission) {
    return null;
  }

  // If permission is not granted
  if (!permission.granted) {
    return <GrantCameraPermission requestPermission={requestPermission} />;
  }

  return (
    <>
      <StatusBar style="light" backgroundColor="black" />
      <View style={cameraStyles.cameraContainer}>
        {/* Camera */}
        <CameraView
          style={cameraStyles.camera}
          ref={cameraRef}
          mode={"picture"}
          facing={facing}
          flash={flashMode}
          ratio={"1:1"}
          responsiveOrientationWhenOrientationLocked
        />

        {/* Opens the menu reguardless of which flash mode is selected */}
        <FlashModeButton setIsMenuVisible={setIsMenuVisible} flashMode={flashMode} />

        {/* Flash Mode Menu */}
        <Menu visible={isMenuVisible} onRequestClose={() => setIsMenuVisible(false)}>
          <FlashModes setFlashMode={setFlashMode} setIsMenuVisible={setIsMenuVisible} />
        </Menu>

        {/* Shutter Container */}
        <ShutterContents
          cameraRef={cameraRef}
          setFacing={setFacing}
          setIsCameraOpen={setIsCameraOpen}
        />
      </View>
    </>
  );
};

export default DeviceCamera;
