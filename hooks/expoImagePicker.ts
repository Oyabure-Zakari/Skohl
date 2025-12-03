import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert } from "react-native";

const useExpoImagePicker = () => {
  const [image, setImage] = useState("");

    const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permission required", "Permission to access the media library is required.");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return { image, pickImage }
};

export default useExpoImagePicker;