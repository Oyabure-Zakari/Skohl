// React
import React, { useRef, useState } from "react";
// React Native
import { TextInput, View } from "react-native";
// Expo
import { Redirect, useRouter } from "expo-router";
// Components
import LoginImage from "@/components/login/LoginImage";
import CustomKeyboard from "@/components/reuseableComponents/CustomKeyboard";
import FormErrorText from "@/components/reuseableComponents/FormErrorText";
import FormFooter from "@/components/reuseableComponents/FormFooter";
import InputField from "@/components/reuseableComponents/InputField";
import OverlayLoadingIndicator from "@/components/reuseableComponents/OverlayLoadingIndicator";
import RegisterLoginButton from "@/components/reuseableComponents/RegisterLoginButton";
import SubTitleText from "@/components/reuseableComponents/SubTitleText";
import TitleText from "@/components/reuseableComponents/TitleText";
// Custom Hooks
import useTogglePasswordVisibility from "@/hooks/togglePasswordVisibility";
// Styles
import useReuseableStyles from "@/styles/reuable.styles";
// Firebase
import handleLogin from "@/firebase/users/handleLogin";
// Store
import useVerificationStore from "@/store/verificatonStore";

export default function LoginScreen() {
  // Hooks
  const router = useRouter();
  // Styles
  const reuableStyles = useReuseableStyles();
  // Refs
  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");
  const textInputRef = useRef<TextInput>(null);
  // State
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Hooks from  zustand store
  const verificationToken = useVerificationStore((state) => state.verificationToken);
  const { isPasswordHidden, togglePasswordVisibility } = useTogglePasswordVisibility();

  // Redirect to verification screen if verification token is not present
  if (!verificationToken) return <Redirect href="/(public)/(auth)" />;

  const handleSignIn = async () => {
    await handleLogin(emailInputRef, passwordInputRef, textInputRef, setError, setIsLoading);
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
          {/* Login Header */}
          <LoginImage />
          <TitleText text={"Login Account"} />
          <SubTitleText text={"Welcome Back!"} />

          {/* Error message */}
          {error && <FormErrorText error={error} />}

          {/* Form */}
          <View style={reuableStyles.textInputContainer}>
            <InputField
              textInputRef={textInputRef}
              onChangeText={(text) => (emailInputRef.current = text)}
              placeholder="Email"
              iconType={"person"}
              autoCapitalize={"none"}
            />

            <InputField
              textInputRef={textInputRef}
              onChangeText={(text) => (passwordInputRef.current = text)}
              placeholder="Password"
              secureTextEntry={isPasswordHidden}
              iconType={"padlock"}
              togglePasswordVisibility={togglePasswordVisibility}
            />
          </View>

          {/* Login Button */}
          <RegisterLoginButton text={"Sign In"} handleSignUp={handleSignIn} />

          {/* Footer */}
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
