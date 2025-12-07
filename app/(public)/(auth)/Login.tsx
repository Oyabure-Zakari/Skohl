import React, { useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";

import { Redirect, useRouter } from "expo-router";

import LoginImage from "@/components/login/LoginImage";
import CustomButton from "@/components/reuseableComponents/CustomButton";
import CustomKeyboard from "@/components/reuseableComponents/CustomKeyboard";
import FormErrorText from "@/components/reuseableComponents/FormErrorText";
import FormFooter from "@/components/reuseableComponents/FormFooter";
import InputField from "@/components/reuseableComponents/InputField";
import OverlayLoadingIndicator from "@/components/reuseableComponents/OverlayLoadingIndicator";
import SubTitleText from "@/components/reuseableComponents/SubTitleText";
import TitleText from "@/components/reuseableComponents/TitleText";

import useTogglePasswordVisibility from "@/hooks/togglePasswordVisibility";

import useReuseableStyles from "@/styles/reuable.styles";

import { auth } from "@/firebase/firebase.config";
import useVerificationStore from "@/store/verificatonStore";
import { signInWithEmailAndPassword } from "firebase/auth";

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

  const isFormValidated = (): boolean => {
    if (!emailInputRef.current || !passwordInputRef.current) {
      setError("All fields are required");
      return false;
    }

    setError("");
    return true;
  };

  const signInUser = async () => {
    setIsLoading(true);
    setError("");
    try {
      // Create user with email and password
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailInputRef.current,
        passwordInputRef.current
      );
      const user = userCredential.user;
      console.log("Document written with ID: ", user.uid);
      // On success, you might want to navigate to another screen
      // For example: router.replace('/(private)/(tabs)');
    } catch (error: any) {
      switch (error.code) {
        case "auth/invalid-credential":
        case "auth/user-not-found":
        case "auth/wrong-password":
          setError("Invalid email or password. Please try again.");
          break;
        case "auth/invalid-email":
          setError("Invalid email address");
          break;
        case "auth/too-many-requests":
          setError("Too many requests");
          break;
        case "auth/network-request-failed":
          setError("Network request failed");
          break;
        case "auth/internal-error":
          setError("Internal error");
          break;
        default:
          setError("Something went wrong");
          break;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = async () => {
    if (!isFormValidated()) return;
    await signInUser();
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

          <TouchableOpacity onPress={handleSignIn}>
            <CustomButton text={"Sign In"} />
          </TouchableOpacity>

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
