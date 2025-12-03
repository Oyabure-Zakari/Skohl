import DefaultAvatar from "@/components/registration/DefaultAvatar";
import EditPicButton from "@/components/registration/EditPicButton";
import RegisterImage from "@/components/registration/RegisterImage";
import CustomButton from "@/components/reuseableComponents/CustomButton";
import FooterText1 from "@/components/reuseableComponents/FooterText1";
import FooterText2 from "@/components/reuseableComponents/FooterText2";
import InputField from "@/components/reuseableComponents/InputField";
import SubTitleText from "@/components/reuseableComponents/SubTitleText";
import TitleText from "@/components/reuseableComponents/TitleText";
import useRegisterScreenStyles from "@/styles/registerScreen.styles";
import useReuseableStyles from "@/styles/reuable.styles";
import { Redirect, useRouter } from "expo-router";

import CustomKeyboard from "@/components/reuseableComponents/CustomKeyboard";
import useVerificationStore from "@/store/verificatonStore";
import React, { useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";

import FormErrorText from "@/components/reuseableComponents/FormErrorText";
import OverlayLoadingIndicator from "@/components/reuseableComponents/OverlayLoadingIndicator";

import useExpoImagePicker from "@/hooks/expoImagePicker";

export default function RegistartionScreen() {
  const router = useRouter();
  const reuableStyles = useReuseableStyles();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");
  const confirmPasswordInputRef = useRef("");

  const { image, pickImage } = useExpoImagePicker();

  const registerStyles = useRegisterScreenStyles();

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
            <DefaultAvatar userImage={image} />
            <EditPicButton pickImage={pickImage} />
          </View>

          {error && <FormErrorText error={error} />}

          <View style={reuableStyles.textInputContainer}>
            <InputField
              onChangeText={(text) => (emailInputRef.current = text)}
              placeholder="Email"
            />

            <InputField
              onChangeText={(text) => (passwordInputRef.current = text)}
              placeholder="Password"
              secureTextEntry={true}
            />

            <InputField
              onChangeText={(text) => (confirmPasswordInputRef.current = text)}
              placeholder="Confirm Password"
              secureTextEntry={true}
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
