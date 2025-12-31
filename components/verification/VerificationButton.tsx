import VerificationButtonProps from "@/types/VerificationButtonProps";
import isFormValidated from "@/utils/validateForm";
import React from "react";
import { TouchableOpacity } from "react-native";
import CustomButton from "../reuseableComponents/CustomButton";

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
      <TouchableOpacity onPress={openWebView}>
        <CustomButton text={"Verify Me"} />
      </TouchableOpacity>
    </>
  );
};

export default VerificationButton;
