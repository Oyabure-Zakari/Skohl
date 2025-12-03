import LoginImage from "@/components/login/LoginImage";
import CustomButton from "@/components/reuseableComponents/CustomButton";
import CustomKeyboard from "@/components/reuseableComponents/CustomKeyboard";
import FooterText1 from "@/components/reuseableComponents/FooterText1";
import FooterText2 from "@/components/reuseableComponents/FooterText2";
import FormErrorText from "@/components/reuseableComponents/FormErrorText";
import InputField from "@/components/reuseableComponents/InputField";
import OverlayLoadingIndicator from "@/components/reuseableComponents/OverlayLoadingIndicator";
import SubTitleText from "@/components/reuseableComponents/SubTitleText";
import TitleText from "@/components/reuseableComponents/TitleText";
import useTogglePasswordVisibility from "@/hooks/togglePasswordVisibility";
import useVerificationStore from "@/store/verificatonStore";
import useReuseableStyles from "@/styles/reuable.styles";
import { Redirect, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";

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

  const handleSignIn = async () => {};

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
            />

            <InputField
              onChangeText={(text) => (passwordInputRef.current = text)}
              placeholder="Password"
              secureTextEntry={true}
              iconType={"padlock"}
              togglePasswordVisibility={togglePasswordVisibility}
            />
          </View>

          <TouchableOpacity onPress={handleSignIn}>
            <CustomButton text={"Sign In"} />
          </TouchableOpacity>

          <View style={reuableStyles.footer}>
            <FooterText1 text={"Don't have an account?"} />
            <TouchableOpacity onPress={() => router.push("/(public)/(auth)/Register")}>
              <FooterText2 text={"Sign Up"} />
            </TouchableOpacity>
          </View>
        </CustomKeyboard>
      )}
    </>
  );
}
