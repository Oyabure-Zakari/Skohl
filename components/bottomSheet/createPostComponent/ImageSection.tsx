import COLORS from "@/constants/colors";
import blurhash from "@/constants/expoBlurImage";
import useExpoImagePicker from "@/hooks/expoImagePicker";
import usePhotoStore from "@/store/photoStore";
import useCreatePostBottomSheetStyles from "@/styles/createPostBottomSheetStyles";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type PhotoSectionProps = {
  photo: string;
  openCamera: () => void;
};

const PhotoSection: React.FC<PhotoSectionProps> = ({ photo, openCamera }) => {
  // Custom Hooks
  const { pickImage } = useExpoImagePicker(); // Image Picker
  // zustand
  const clearImage = usePhotoStore((state) => state.clearImage);

  // Styles
  const createPostStyles = useCreatePostBottomSheetStyles();

  return (
    <>
      {!photo ? (
        <View style={createPostStyles.photoPlaceholder}>
          <Text style={createPostStyles.photoText}>Image</Text>
        </View>
      ) : (
        <Image
          source={{ uri: photo }}
          style={createPostStyles.postPhoto}
          placeholder={{ blurhash }}
          contentFit="contain"
          transition={1000}
        />
      )}

      {/* Photo Options */}
      <View style={createPostStyles.photoOptions}>
        <TouchableOpacity style={createPostStyles.photoOption} onPress={openCamera}>
          <MaterialCommunityIcons name="camera" size={25} color={COLORS.darkGrey} />
        </TouchableOpacity>

        <TouchableOpacity style={createPostStyles.photoOption} onPress={pickImage}>
          <Entypo name="images" size={25} color={COLORS.darkGrey} />
        </TouchableOpacity>

        <TouchableOpacity style={createPostStyles.photoOption} onPress={clearImage}>
          <MaterialCommunityIcons name="image-off-outline" size={25} color={COLORS.darkGrey} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default PhotoSection;
