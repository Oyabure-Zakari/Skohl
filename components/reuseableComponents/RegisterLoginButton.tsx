import React from "react";
import { TouchableOpacity } from "react-native";
import CustomButton from "./CustomButton";

type RegisterLoginButtonProps = {
  text: string;
  handleSignUp?: () => Promise<void>;
  handleSignIn?: () => Promise<void>;
};

const RegisterLoginButton: React.FC<RegisterLoginButtonProps> = ({ text, handleSignUp }) => {
  return (
    <TouchableOpacity onPress={handleSignUp}>
      <CustomButton text={text} />
    </TouchableOpacity>
  );
};

export default RegisterLoginButton;
