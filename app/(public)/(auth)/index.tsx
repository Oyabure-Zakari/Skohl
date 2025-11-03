import CustomButton from "@/components/reuseableComponents/CustomButton";
import CustomKeyboard from "@/components/reuseableComponents/CustomKeyboard";
import InputField from "@/components/reuseableComponents/InputField";
import SubTitleText from "@/components/reuseableComponents/SubTitleText";
import TitleText from "@/components/reuseableComponents/TitleText";
import SelectUniPicker from "@/components/verification/SelectUniPicker";
import VerifyImage from "@/components/verification/VerifyImage";
import useReuseableStyles from "@/styles/reuable.styles";
import { useRouter } from "expo-router";

import Constants from "expo-constants";
import { WebView } from "react-native-webview";

import COLORS from "@/constants/colors";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function VerificationScreen() {
  const [showWebView, setShowWebView] = useState(false);
  const router = useRouter();
  const reuableStyles = useReuseableStyles();
  const [isloading, setIsLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [department, setDepartment] = useState("");
  const [faculty, setFaculty] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("none");

  useEffect(() => {
    if (selectedUniversity === "ABU") {
      setShowWebView(true);
      setIsLoading(true); // Start loading immediately
    }
  }, [selectedUniversity]);

  const abuPortalUrl = new URL("https://portal.abu.edu.ng/");

  return (
    <CustomKeyboard>
      {!showWebView && (
        <>
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
        </>
      )}

      {/* === WEBVIEW + LOADING INDICATOR === */}
      {showWebView && (
        <View style={styles.webviewContainer}>
          <WebView
            style={styles.webview}
            source={{ uri: abuPortalUrl.href, method: "GET" }}
            onLoadStart={() => setIsLoading(true)}
            onLoadEnd={() => setIsLoading(false)}
            onError={() => setIsLoading(false)} // Stop spinner on error
          />

          {/* Full-screen loading overlay */}
          {isloading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color={COLORS.darkBlue} />
            </View>
          )}
        </View>
      )}
    </CustomKeyboard>
  );
}

const styles = StyleSheet.create({
  webviewContainer: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  webview: {
    flex: 1,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
});
