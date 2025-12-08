import React, { useRef, useState } from "react";
import { View } from "react-native";

import { Redirect, useRouter } from "expo-router";

import EditPicButton from "@/components/registration/EditPicButton";
import ProfileImage from "@/components/registration/ProfileImage";
import RegisterImage from "@/components/registration/RegisterImage";
import CustomKeyboard from "@/components/reuseableComponents/CustomKeyboard";
import FormErrorText from "@/components/reuseableComponents/FormErrorText";
import FormFooter from "@/components/reuseableComponents/FormFooter";
import InputField from "@/components/reuseableComponents/InputField";
import OverlayLoadingIndicator from "@/components/reuseableComponents/OverlayLoadingIndicator";
import SubTitleText from "@/components/reuseableComponents/SubTitleText";
import TitleText from "@/components/reuseableComponents/TitleText";

import useExpoImagePicker from "@/hooks/expoImagePicker";
import useTogglePasswordVisibility from "@/hooks/togglePasswordVisibility";

import useVerificationStore from "@/store/verificatonStore";

import useRegisterScreenStyles from "@/styles/registerScreen.styles";
import useReuseableStyles from "@/styles/reuable.styles";

import RegisterLoginButton from "@/components/reuseableComponents/RegisterLoginButton";
import handleRegistration from "@/firebase/users/handleRegistration";

export default function RegistartionScreen() {
  const router = useRouter();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");
  const confirmPasswordInputRef = useRef("");

  const reuableStyles = useReuseableStyles();
  const registerStyles = useRegisterScreenStyles();

  // Custom hook
  const { image, pickImage } = useExpoImagePicker();
  const { isPasswordHidden, togglePasswordVisibility } = useTogglePasswordVisibility();

  // Zustand store
  const studentInfo = useVerificationStore((state) => state.studentInfo);
  const verificationToken = useVerificationStore((state) => state.verificationToken);

  // Redirect to verification screen if verification token is not present
  if (!verificationToken) return <Redirect href="/(public)/(auth)" />;

  const handleSignUp = async () => {
    await handleRegistration(
      image,
      studentInfo,
      emailInputRef.current,
      passwordInputRef.current,
      confirmPasswordInputRef.current,
      setError,
      setIsLoading
    );
  };

  const navigateToLogin = () => {
    router.push("/(public)/(auth)/Login");
  };

  return (
    <>
      {isLoading ? (
        <OverlayLoadingIndicator />
      ) : (
        <CustomKeyboard>
          <RegisterImage />

          <TitleText text={"Create Account"} />

          <SubTitleText text={"Sign up to continue"} />

          <View style={registerStyles.profile}>
            <ProfileImage userImage={image} />
            <EditPicButton pickImage={pickImage} />
          </View>

          {error && <FormErrorText error={error} />}

          <View style={reuableStyles.textInputContainer}>
            <InputField
              onChangeText={(text) => (emailInputRef.current = text)}
              placeholder="Email"
              iconType={"person"}
              autoCapitalize={"none"}
            />

            <InputField
              onChangeText={(text) => (passwordInputRef.current = text)}
              placeholder="Password"
              secureTextEntry={isPasswordHidden}
              iconType={"padlock"}
              togglePasswordVisibility={togglePasswordVisibility}
            />

            <InputField
              onChangeText={(text) => (confirmPasswordInputRef.current = text)}
              placeholder="Confirm Password"
              secureTextEntry={isPasswordHidden}
              iconType={"padlock"}
              togglePasswordVisibility={togglePasswordVisibility}
            />
          </View>

          <RegisterLoginButton handleSignUp={handleSignUp} />

          <FormFooter
            footerText1={"Already have an account?"}
            footerText2={"Sign In"}
            navigateToLoginOrRegister={navigateToLogin}
          />
        </CustomKeyboard>
      )}
    </>
  );
}
