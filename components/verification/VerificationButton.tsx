import VerificationButtonProps from "@/types/VerificationButtonProps";
import isFormValidated from "@/utils/validateForm";
import React from "react";
import { TouchableOpacity } from "react-native";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import CustomButton from "../reuseableComponents/CustomButton";

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const VerificationButton: React.FC<VerificationButtonProps> = ({
  surnameInputRef,
  firstnameInputRef,
  selectedFaculty,
  setError,
  setIsLoading,
  setIsWebViewOpen,
}) => {
  const openWebView = () => {
    // Validate form
    if (!isFormValidated(firstnameInputRef, surnameInputRef, selectedFaculty, setError)) return;

    // Open Webview
    setIsWebViewOpen(true);
    // Start loading immediately
    setIsLoading(true);
  };

  return (
    <>
      {surnameInputRef && firstnameInputRef && selectedFaculty && (
        <AnimatedTouchableOpacity entering={FadeInDown} exiting={FadeOutDown} onPress={openWebView}>
          <CustomButton text={"Verify Me"} />
        </AnimatedTouchableOpacity>
      )}
    </>
  );
};

export default VerificationButton;
