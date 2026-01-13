// React
import { Dispatch, SetStateAction, useRef, useState } from "react";
// React Native
import { Text, TouchableOpacity, View } from "react-native";
// Expo
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { StatusBar } from "expo-status-bar";
// Packages/Libraries
import { Menu, MenuDivider, MenuItem } from "react-native-material-menu";
// Components
import CustomButton from "@/components/reuseableComponents/CustomButton";
// Zustand
import usePhotoStore from "@/store/photoStore";
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

  // Zustand
  const setImage = usePhotoStore((state) => state.setImage);

  // If no permission
  if (!permission) {
    return null;
  }

  // If permission is not granted
  if (!permission.granted) {
    return (
      <View style={cameraStyles.grantPermissionContainer}>
        <Text style={{ textAlign: "center" }}>We need your permission to use the camera</Text>
        <TouchableOpacity onPress={requestPermission}>
          <CustomButton text={"Grant Permission"} />
        </TouchableOpacity>
      </View>
    );
  }

  const closeCamera = () => {
    setIsCameraOpen(false);
  };

  const takePicture = async () => {
    const photo = await cameraRef.current?.takePictureAsync();
    if (photo?.uri) {
      setImage(photo.uri);
      setIsCameraOpen(false);
    }
  };

  const toggleFacing = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  return (
    <>
      <StatusBar style="light" backgroundColor="black" />
      <View style={cameraStyles.cameraContainer}>
        <CameraView
          style={cameraStyles.camera}
          ref={cameraRef}
          mode={"picture"}
          facing={facing}
          flash={flashMode}
          ratio={"1:1"}
          responsiveOrientationWhenOrientationLocked
        />

        {/* Opens the menu reguardless of the flash mode that is set */}
        <TouchableOpacity onPress={() => setIsMenuVisible(true)} style={{ padding: 16 }}>
          {flashMode === "auto" && (
            <MaterialCommunityIcons name="flash-auto" size={24} color="white" />
          )}
          {flashMode === "off" && (
            <MaterialCommunityIcons name="flash-off-outline" size={24} color="white" />
          )}
          {flashMode === "on" && <MaterialCommunityIcons name="flash" size={24} color="white" />}
        </TouchableOpacity>

        {/* Flash Mode Menu */}
        <Menu visible={isMenuVisible} onRequestClose={() => setIsMenuVisible(false)}>
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
        </Menu>

        {/* Shutter Container */}
        <View style={cameraStyles.shutterContainer}>
          {/* Close Camera */}
          <TouchableOpacity onPress={closeCamera}>
            <MaterialCommunityIcons name="camera-off" size={30} color="white" />
          </TouchableOpacity>

          {/* Take Picture */}
          <TouchableOpacity onPress={takePicture}>
            <View style={cameraStyles.shutterBtn}>
              <View
                style={[
                  cameraStyles.shutterBtnInner,
                  {
                    backgroundColor: "white",
                  },
                ]}
              />
            </View>
          </TouchableOpacity>

          {/* Switch Camera */}
          <TouchableOpacity onPress={toggleFacing}>
            <MaterialIcons name="cameraswitch" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default DeviceCamera;
