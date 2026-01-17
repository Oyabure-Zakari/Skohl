import React from "react";
import { TouchableOpacity } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import CustomButton from "../reuseableComponents/CustomButton";

// Custom animated components
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

type SaveProfileButtonProps = {
  handleSaveProfile: () => void;
};

const SaveProfileButton: React.FC<SaveProfileButtonProps> = ({ handleSaveProfile }) => {
  return (
    <AnimatedTouchableOpacity
      entering={FadeInDown.delay(800)}
      style={{ marginTop: 20 }}
      onPress={handleSaveProfile}
    >
      <CustomButton text="Save" />
    </AnimatedTouchableOpacity>
  );
};

export default SaveProfileButton;
