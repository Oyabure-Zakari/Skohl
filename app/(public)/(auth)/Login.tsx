import React, { useRef, useState } from "react";
import { View } from "react-native";

import { Redirect, useRouter } from "expo-router";

import LoginImage from "@/components/login/LoginImage";
import CustomKeyboard from "@/components/reuseableComponents/CustomKeyboard";
import FormErrorText from "@/components/reuseableComponents/FormErrorText";
import FormFooter from "@/components/reuseableComponents/FormFooter";
import InputField from "@/components/reuseableComponents/InputField";
import OverlayLoadingIndicator from "@/components/reuseableComponents/OverlayLoadingIndicator";
import SubTitleText from "@/components/reuseableComponents/SubTitleText";
import TitleText from "@/components/reuseableComponents/TitleText";

import useTogglePasswordVisibility from "@/hooks/togglePasswordVisibility";

import useReuseableStyles from "@/styles/reuable.styles";

import RegisterLoginButton from "@/components/reuseableComponents/RegisterLoginButton";
import handleLogin from "@/firebase/users/handleLogin";
import useVerificationStore from "@/store/verificatonStore";

export default function LoginScreen() {
  const router = useRouter();
  const reuableStyles = useReuseableStyles();

  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const verificationToken = useVerificationStore((state) => state.verificationToken);
  const { isPasswordHidden, togglePasswordVisibility } = useTogglePasswordVisibility();

  // Redirect to verification screen if verification token is not present
  if (!verificationToken) return <Redirect href="/(public)/(auth)" />;

  const handleSignIn = async () => {
    await handleLogin(emailInputRef.current, passwordInputRef.current, setError, setIsLoading);
  };

  const navigateToRegister = () => {
    router.push("/(public)/(auth)/Register");
  };

  return (
    <>
      {isLoading ? (
        <OverlayLoadingIndicator />
      ) : (
        <CustomKeyboard>
          <LoginImage />

          <TitleText text={"Login Account"} />

          <SubTitleText text={"Welcome Back!"} />

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
          </View>

          <RegisterLoginButton text={"Sign In"} handleSignUp={handleSignIn} />

          <FormFooter
            footerText1={"Don't have an account?"}
            footerText2={"Sign Up"}
            navigateToLoginOrRegister={navigateToRegister}
          />
        </CustomKeyboard>
      )}
    </>
  );
}
