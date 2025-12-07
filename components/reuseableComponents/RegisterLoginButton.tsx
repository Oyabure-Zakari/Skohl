import React from "react";
import { TouchableOpacity } from "react-native";
import CustomButton from "./CustomButton";

type RegisterLoginButtonProps = {
  handleSignUp: () => Promise<void>;
};

const RegisterLoginButton: React.FC<RegisterLoginButtonProps> = ({ handleSignUp }) => {
  return (
    <TouchableOpacity onPress={handleSignUp}>
      <CustomButton text={"Sign Up"} />
    </TouchableOpacity>
  );
};

export default RegisterLoginButton;
