import InputField from "@/components/verification/InputField";
import SubTitleText from "@/components/verification/SubTitleText";
import TitleText from "@/components/verification/TitleText";

import VerifyButton from "@/components/verification/VerifyButton";
import styles from "@/styles/verification.styles";
import React from "react";
import { View } from "react-native";

export default function VerificationScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TitleText text={"Verify Account"} />
        <SubTitleText text={"Let us confirm you are a student"} />
        <View style={styles.textInputContainer}>
          <InputField placeholder={"First Name"} />
          <InputField placeholder={"Surname"} />
          <InputField placeholder={"Department"} />
          <InputField placeholder={"Faculty"} />
          <VerifyButton />
        </View>
      </View>
    </View>
  );
}
