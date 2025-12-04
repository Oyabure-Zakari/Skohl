import React, { useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";

import { Redirect, useRouter } from "expo-router";

import EditPicButton from "@/components/registration/EditPicButton";
import ProfileImage from "@/components/registration/ProfileImage";
import RegisterImage from "@/components/registration/RegisterImage";
import CustomButton from "@/components/reuseableComponents/CustomButton";
import CustomKeyboard from "@/components/reuseableComponents/CustomKeyboard";
import FooterText1 from "@/components/reuseableComponents/FooterText1";
import FooterText2 from "@/components/reuseableComponents/FooterText2";
import FormErrorText from "@/components/reuseableComponents/FormErrorText";
import InputField from "@/components/reuseableComponents/InputField";
import OverlayLoadingIndicator from "@/components/reuseableComponents/OverlayLoadingIndicator";
import SubTitleText from "@/components/reuseableComponents/SubTitleText";
import TitleText from "@/components/reuseableComponents/TitleText";

import useExpoImagePicker from "@/hooks/expoImagePicker";
import useTogglePasswordVisibility from "@/hooks/togglePasswordVisibility";
import useVerificationStore from "@/store/verificatonStore";

import useRegisterScreenStyles from "@/styles/registerScreen.styles";
import useReuseableStyles from "@/styles/reuable.styles";
export default function RegistartionScreen() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");
  const confirmPasswordInputRef = useRef("");

  const router = useRouter();

  const reuableStyles = useReuseableStyles();
  const registerStyles = useRegisterScreenStyles();

  const { image, pickImage } = useExpoImagePicker();

  const { isPasswordHidden, togglePasswordVisibility } = useTogglePasswordVisibility();

  const verificationToken = useVerificationStore((state) => state.verificationToken);

  // Redirect to verification screen if verification token is not present
  if (!verificationToken) return <Redirect href="/(public)/(auth)" />;

  const handleSignUp = async () => {};

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

          <TouchableOpacity onPress={handleSignUp}>
            <CustomButton text={"Sign Up"} />
          </TouchableOpacity>

          <View style={reuableStyles.footer}>
            <FooterText1 text={"Already have an account?"} />
            <TouchableOpacity onPress={() => router.push("/(public)/(auth)/Login")}>
              <FooterText2 text={"Sign In"} />
            </TouchableOpacity>
          </View>
        </CustomKeyboard>
      )}
    </>
  );
}
