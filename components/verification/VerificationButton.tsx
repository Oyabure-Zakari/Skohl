import isFormValidated from "@/utils/validateForm";
import React from "react";
import { TouchableOpacity } from "react-native";
import CustomButton from "../reuseableComponents/CustomButton";

type VefVerificationButtonProps = {
  firstname: string;
  surname: string;
  selectedFaculty: string;
  setError: (value: string) => void;
  setIsLoading: (value: boolean) => void;
  setIsWebViewOpen: (value: boolean) => void;
};

const VerificationButton: React.FC<VefVerificationButtonProps> = ({
  surname,
  firstname,
  selectedFaculty,
  setError,
  setIsLoading,
  setIsWebViewOpen,
}) => {
  const openWebView = () => {
    // Validate form
    if (!isFormValidated(firstname, surname, selectedFaculty, setError)) return;

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
