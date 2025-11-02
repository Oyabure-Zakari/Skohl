import InputField from "@/components/verification/InputField";
import SubTitleText from "@/components/verification/SubTitleText";
import TitleText from "@/components/verification/TitleText";
import VerifyButton from "@/components/verification/VerifyButton";
import styles from "@/styles/verification.styles";
import React, { useState } from "react";
import { View } from "react-native";

export default function VerificationScreen() {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [department, setDepartment] = useState("");
  const [faculty, setFaculty] = useState("");

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <TitleText />
        <SubTitleText />
        <View style={styles.textInputContainer}>
          <InputField
            placeholder={"First Name"}
            value={firstName}
            onChangeText={setFirstName}
          />
          <InputField
            placeholder={"Surname"}
            value={surname}
            onChangeText={setSurname}
          />
          <InputField
            placeholder={"Department"}
            value={department}
            onChangeText={setDepartment}
          />
          <InputField
            placeholder={"Faculty"}
            value={faculty}
            onChangeText={setFaculty}
          />
          <VerifyButton />
        </View>
      </View>
    </View>
  );
}
