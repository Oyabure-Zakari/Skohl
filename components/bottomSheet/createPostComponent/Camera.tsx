import CustomButton from "@/components/reuseableComponents/CustomButton";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type DeviceCameraProps = {
  setIsCameraOpen: Dispatch<SetStateAction<boolean>>;
  setCameraImage: Dispatch<SetStateAction<string | null>>;
};

const DeviceCamera: React.FC<DeviceCameraProps> = ({ setIsCameraOpen, setCameraImage }) => {
  const cameraRef = useRef<CameraView>(null);
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return null;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
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
      setCameraImage(photo.uri);
      setIsCameraOpen(false);
    }
  };

  const toggleFacing = () => {
    setFacing((prev) => (prev === "back" ? "front" : "back"));
  };

  return (
    <View style={styles.cameraContainer}>
      <CameraView
        style={styles.camera}
        ref={cameraRef}
        mode={"picture"}
        facing={facing}
        responsiveOrientationWhenOrientationLocked
      />

      {/* Shutter Container */}
      <View style={styles.shutterContainer}>
        {/* Close Camera */}
        <TouchableOpacity onPress={closeCamera}>
          <MaterialCommunityIcons name="camera-off" size={30} color="white" />
        </TouchableOpacity>

        {/* Shutter Button */}
        <TouchableOpacity onPress={takePicture}>
          <View style={styles.shutterBtn}>
            <View
              style={[
                styles.shutterBtnInner,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  cameraContainer: StyleSheet.absoluteFillObject,

  camera: StyleSheet.absoluteFillObject,

  shutterContainer: {
    position: "absolute",
    bottom: 44,
    left: 0,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: 30,
  },

  shutterBtn: {
    backgroundColor: "transparent",
    borderWidth: 5,
    borderColor: "white",
    width: 85,
    height: 85,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
  },

  shutterBtnInner: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
});
