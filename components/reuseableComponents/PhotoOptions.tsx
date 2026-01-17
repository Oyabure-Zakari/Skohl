import COLORS from "@/constants/colors";
import useExpoImagePicker from "@/hooks/expoImagePicker";
import useCreatePostBottomSheetStyles from "@/styles/createPostBottomSheetStyles";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

// Custom animated components
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

type PhotoOPtionsProps = {
  openCamera: () => void;
  clearImage: () => void;
};

const PhotoOptions: React.FC<PhotoOPtionsProps> = ({ openCamera, clearImage }) => {
  // Custom Hooks
  const { pickImage } = useExpoImagePicker(); // Image Picker

  // Styles
  const createPostStyles = useCreatePostBottomSheetStyles();

  return (
    <View style={createPostStyles.photoOptions}>
      {/* Take picture from camera */}
      <AnimatedTouchableOpacity
        entering={FadeInDown.delay(400)}
        style={createPostStyles.photoOption}
        onPress={openCamera}
      >
        <MaterialCommunityIcons name="camera" size={25} color={COLORS.darkGrey} />
      </AnimatedTouchableOpacity>

      {/* Take picture from gallery */}
      <AnimatedTouchableOpacity
        entering={FadeInDown.delay(600)}
        style={createPostStyles.photoOption}
        onPress={pickImage}
      >
        <Entypo name="images" size={25} color={COLORS.darkGrey} />
      </AnimatedTouchableOpacity>

      {/* Clear recently taken picture */}
      <AnimatedTouchableOpacity
        entering={FadeInDown.delay(800)}
        style={createPostStyles.photoOption}
        onPress={clearImage}
      >
        <MaterialCommunityIcons name="image-off-outline" size={25} color={COLORS.darkGrey} />
      </AnimatedTouchableOpacity>
    </View>
  );
};

export default PhotoOptions;
