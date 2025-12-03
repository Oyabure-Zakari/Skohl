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
import { auth } from "@/firebase/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function RegistartionScreen() {
  const router = useRouter();
  const reuableStyles = useReuseableStyles();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");
  const confirmPasswordInputRef = useRef("");

  const registerStyles = useRegisterScreenStyles();

  const studentInfo = useVerificationStore((state) => state.studentInfo);
  const verificationToken = useVerificationStore((state) => state.verificationToken);

  console.log("studentInfo: ", studentInfo);
  console.log("verification token: ", verificationToken);

  // Redirect to verification screen if verification token is not present
  if (!verificationToken) return <Redirect href="/(public)/(auth)" />;

  const handleSignUp = async () => {
    if (!emailInputRef.current || !passwordInputRef.current || !confirmPasswordInputRef.current) {
      setError("All fields are required");
      return;
    }

    if (passwordInputRef.current !== confirmPasswordInputRef.current) {
      setError("Passwords do not match");
      return;
    }
    try {
      setIsLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailInputRef.current,
        passwordInputRef.current
      );
      console.log("User: ", JSON.stringify(userCredential, null, 2));
      // User registration successful then create user in firestore database
      setError("");
    } catch (error: any) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setError("The email address is already in use by another account.");
          break;
        case "auth/invalid-email":
          setError("The email address is not valid.");
          break;
        case "auth/weak-password":
          setError("The password must be at least 6 characters long.");
          break;
        case "auth/network-request-failed":
          setError("Network issue. Please check your internet connection.");
          break;
        case "auth/internal-error":
          setError("An internal server error occurred. Please try again later.");
          break;
        default:
          setError("An error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
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
            <DefaultAvatar />
            <EditPicButton />
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
            />

            <InputField
              onChangeText={(text) => (confirmPasswordInputRef.current = text)}
              placeholder="Confirm Password"
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
