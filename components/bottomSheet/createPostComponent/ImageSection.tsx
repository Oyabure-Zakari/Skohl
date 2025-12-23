import COLORS from "@/constants/colors";
import blurhash from "@/constants/expoBlurImage";
import useCreatePostBottomSheetStyles from "@/styles/createPostBottomSheetStyles";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type PhotoSectionProps = {
  photoText: string;
  photo: string;
  cameraImage: string | null;
  pickImage: () => Promise<void>;
  openCamera: () => void;
};

const PhotoSection: React.FC<PhotoSectionProps> = ({
  photoText,
  photo,
  cameraImage,
  pickImage,
  openCamera,
}) => {
  // Styles
  const createPostStyles = useCreatePostBottomSheetStyles();

  return (
    <>
      {!photo && !cameraImage ? (
        <View style={createPostStyles.photoPlaceholder}>
          <Text style={createPostStyles.photoText}>{photoText}</Text>
        </View>
      ) : (
        <Image
          source={{ uri: photo || cameraImage! }}
          style={createPostStyles.postPhoto}
          placeholder={{ blurhash }}
          contentFit="contain"
          transition={1000}
        />
      )}

      {/* Photo Options */}
      <View style={createPostStyles.photoOptions}>
        <TouchableOpacity style={createPostStyles.photoOption}>
          <MaterialCommunityIcons
            name="camera"
            size={25}
            color={COLORS.darkGrey}
            onPress={openCamera}
          />
        </TouchableOpacity>

        <TouchableOpacity style={createPostStyles.photoOption} onPress={pickImage}>
          <Entypo name="images" size={25} color={COLORS.darkGrey} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default PhotoSection;
