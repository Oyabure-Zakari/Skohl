import CustomButton from "@/components/reuseableComponents/CustomButton";
import usePhotoStore from "@/store/photoStore";
import cameraStyles from "@/styles/camera.styles";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type DeviceCameraProps = {
  setIsCameraOpen: Dispatch<SetStateAction<boolean>>;
};

const DeviceCamera: React.FC<DeviceCameraProps> = ({ setIsCameraOpen }) => {
  const cameraRef = useRef<CameraView>(null);
  const [flashMode, setFlashMode] = useState<"on" | "off" | "auto">("off");
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  const setImage = usePhotoStore((state) => state.setImage);
  if (!permission) {
    return null;
  }

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
    <View style={cameraStyles.cameraContainer}>
      <CameraView
        style={cameraStyles.camera}
        ref={cameraRef}
        mode={"picture"}
        facing={facing}
        flash={flashMode}
        responsiveOrientationWhenOrientationLocked
      />

      {/* Shutter Container */}
      <View style={cameraStyles.shutterContainer}>
        {/* Close Camera */}
        <TouchableOpacity onPress={closeCamera}>
          <MaterialCommunityIcons name="camera-off" size={30} color="white" />
        </TouchableOpacity>

        {/* Shutter Button */}
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
  );
};

export default DeviceCamera;
