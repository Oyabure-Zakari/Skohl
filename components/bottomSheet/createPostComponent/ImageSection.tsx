import PhotoOptions from "@/components/reuseableComponents/PhotoOptions";
import blurhash from "@/constants/expoBlurImage";
import usePhotoStore from "@/store/photoStore";
import useCreatePostBottomSheetStyles from "@/styles/createPostBottomSheetStyles";
import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";

type PhotoSectionProps = {
  photo: string | undefined;
  openCamera: () => void;
};

const PhotoSection: React.FC<PhotoSectionProps> = ({ photo, openCamera }) => {
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
      <PhotoOptions openCamera={openCamera} clearImage={clearImage} />
    </>
  );
};

export default PhotoSection;
