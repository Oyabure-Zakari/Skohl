import React, { useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";

import { Redirect, useRouter } from "expo-router";

import { auth, db } from "@/firebase/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import EditPicButton from "@/components/registration/EditPicButton";
import ProfileImage from "@/components/registration/ProfileImage";
import RegisterImage from "@/components/registration/RegisterImage";
import CustomButton from "@/components/reuseableComponents/CustomButton";
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

  const studentInfo = useVerificationStore((state) => state.studentInfo);
  const verificationToken = useVerificationStore((state) => state.verificationToken);

  // Redirect to verification screen if verification token is not present
  if (!verificationToken) return <Redirect href="/(public)/(auth)" />;

  const isFormValidated = (): boolean => {
    if (!emailInputRef.current || !passwordInputRef.current || !confirmPasswordInputRef.current) {
      setError("All fields are required");
      return false;
    }

    if (passwordInputRef.current !== confirmPasswordInputRef.current) {
      setError("Passwords do not match");
      return false;
    }

    setError("");
    return true;
  };

  const signUpUser = async () => {
    setIsLoading(true);
    setError("");
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailInputRef.current,
        passwordInputRef.current
      );
      const user = userCredential.user;

      // Create user document in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        firstname: studentInfo.firstname,
        surname: studentInfo.surname,
        faculty: studentInfo.faculty,
        gender: studentInfo.gender,
        religion: studentInfo.religion,
      });

      console.log("Document written with ID: ", user.uid);
      // On success, you might want to navigate to another screen
      // For example: router.replace('/(private)/(tabs)');
    } catch (error: any) {
      switch (error.code) {
        case "auth/email-already-exists":
          setError("Email already exists");
          break;
        case "auth/invalid-email":
          setError("Invalid email address");
          break;
        case "auth/invalid-password":
          setError("Password should be at least 6 characters");
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

  const handleSignUp = async () => {
    if (!isFormValidated()) return;
    await signUpUser();
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

          <TouchableOpacity onPress={handleSignUp}>
            <CustomButton text={"Sign Up"} />
          </TouchableOpacity>

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
