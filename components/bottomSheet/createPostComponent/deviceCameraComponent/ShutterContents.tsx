import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React, { Dispatch, SetStateAction } from "react";
import { TouchableOpacity, View } from "react-native";
// Styles
import usePhotoStore from "@/store/photoStore";
import cameraStyles from "@/styles/camera.styles";
import { CameraType, CameraView } from "expo-camera";

type ShutterContentsProps = {
  cameraRef: React.RefObject<CameraView | null>;
  setFacing: Dispatch<SetStateAction<CameraType>>;
  setIsCameraOpen: Dispatch<SetStateAction<boolean>>;
};

const ShutterContents: React.FC<ShutterContentsProps> = ({
  cameraRef,
  setFacing,
  setIsCameraOpen,
}) => {
  // Zustand
  const setImage = usePhotoStore((state) => state.setImage);
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
  );
};

export default ShutterContents;
