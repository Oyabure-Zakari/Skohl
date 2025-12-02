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
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";

export default function RegistartionScreen() {
  const router = useRouter();
  const reuableStyles = useReuseableStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerStyles = useRegisterScreenStyles();

  const studentInfo = useVerificationStore((state) => state.studentInfo);
  const verificationToken = useVerificationStore((state) => state.verificationToken);

  console.log("studentInfo: ", studentInfo);
  console.log("verification token: ", verificationToken);

  // Redirect to verification screen if verification token is not present
  if (!verificationToken) return <Redirect href="/(public)/(auth)" />;

  return (
    <CustomKeyboard>
      <RegisterImage />

      <TitleText text={"Create Account"} />

      <SubTitleText text={"Sign up to continue"} />

      <View style={registerStyles.profile}>
        <DefaultAvatar />
        <EditPicButton />
      </View>

      <View style={reuableStyles.textInputContainer}>
        <InputField value={email} onChangeText={setEmail} placeholder="Email" />

        <InputField value={password} onChangeText={setPassword} placeholder="Password" />

        <InputField
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm Password"
        />
      </View>

      <TouchableOpacity onPress={() => router.back()}>
        <CustomButton text={"Sign Up"} />
      </TouchableOpacity>

      <View style={reuableStyles.footer}>
        <FooterText1 text={"Already have an account?"} />
        <TouchableOpacity onPress={() => router.push("/(public)/(auth)/Login")}>
          <FooterText2 text={"Sign In"} />
        </TouchableOpacity>
      </View>
    </CustomKeyboard>
  );
}
