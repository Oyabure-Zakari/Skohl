import CustomButton from "@/components/reuseableComponents/CustomButton";
import InputField from "@/components/reuseableComponents/InputField";
import SubTitleText from "@/components/reuseableComponents/SubTitleText";
import TitleText from "@/components/reuseableComponents/TitleText";
import SelectUniPicker from "@/components/verification/SelectUniPicker";
import VerifyImage from "@/components/verification/VerifyImage";
import useReuseableStyles from "@/styles/reuable.styles";
import { useRouter } from "expo-router";

import React, { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

export default function VerificationScreen() {
  const router = useRouter();
  const reuableStyles = useReuseableStyles();

  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [department, setDepartment] = useState("");
  const [faculty, setFaculty] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("none");

  return (
    <View style={reuableStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <VerifyImage />

        <TitleText text={"Verify Account"} />

        <SubTitleText text={"Let's confirm you're a student"} />

        <View style={reuableStyles.textInputContainer}>
          <InputField
            value={firstName}
            onChangeText={setFirstName}
            placeholder="First Name"
          />

          <InputField
            value={surname}
            onChangeText={setSurname}
            placeholder="Surname"
          />

          <InputField
            value={department}
            onChangeText={setDepartment}
            placeholder="Department"
          />

          <InputField
            value={faculty}
            onChangeText={setFaculty}
            placeholder="Faculty"
          />

          <SelectUniPicker
            selectedUniversity={selectedUniversity}
            setSelectedUniversity={setSelectedUniversity}
          />
        </View>

        <TouchableOpacity
          onPress={() => router.push("/(public)/(auth)/Register")}
        >
          <CustomButton text={"Verify Me"} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
