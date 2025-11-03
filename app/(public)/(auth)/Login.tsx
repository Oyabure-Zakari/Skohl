import CustomButton from "@/components/reuseableComponents/CustomButton";
import FooterText1 from "@/components/reuseableComponents/FooterText1";
import FooterText2 from "@/components/reuseableComponents/FooterText2";
import InputField from "@/components/reuseableComponents/InputField";
import SubTitleText from "@/components/reuseableComponents/SubTitleText";
import TitleText from "@/components/reuseableComponents/TitleText";
import IMAGES from "@/constants/images";
import useRegisterScreenStyles from "@/styles/registerScreen.styles";
import useReuseableStyles from "@/styles/reuable.styles";
import { useRouter } from "expo-router";

import React, { useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const reuableStyles = useReuseableStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerStyles = useRegisterScreenStyles();

  return (
    <View style={registerStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          style={{ backgroundColor: "red", width: "100%", height: 200 }}
          source={IMAGES.login}
        />

        <TitleText text={"Login Account"} />

        <SubTitleText text={"Welcome Back!"} />

        <View style={reuableStyles.textInputContainer}>
          <InputField
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
          />

          <InputField
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
          />
        </View>

        <TouchableOpacity>
          <CustomButton text={"Sign In"} />
        </TouchableOpacity>

        <View style={reuableStyles.footer}>
          <FooterText1 text={"Don't have an account?"} />
          <TouchableOpacity
            onPress={() => router.push("/(public)/(auth)/Register")}
          >
            <FooterText2 text={"Sign Up"} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
