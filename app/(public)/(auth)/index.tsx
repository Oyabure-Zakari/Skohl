import React, { useRef, useState } from "react";

import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview";

import Constants from "expo-constants";
import { useRouter } from "expo-router";

import CustomButton from "@/components/reuseableComponents/CustomButton";
import CustomKeyboard from "@/components/reuseableComponents/CustomKeyboard";
import FormErrorText from "@/components/reuseableComponents/FormErrorText";
import InputField from "@/components/reuseableComponents/InputField";
import SubTitleText from "@/components/reuseableComponents/SubTitleText";
import TitleText from "@/components/reuseableComponents/TitleText";
import SelectUniPicker from "@/components/verification/SelectUniPicker";
import VerifyImage from "@/components/verification/VerifyImage";

import useReuseableStyles from "@/styles/reuable.styles";

import COLORS from "@/constants/colors";

import useWebViewRedirect from "@/hooks/webViewRedirect";

import {
  abuLoginPortalUrl,
  abuStudentDashboardUrl,
  abuStudentProfileUrl,
} from "@/urls/ABU";

import VerificationStatusComponent from "@/components/reuseableComponents/VerificationStatusComponent";
import { captilizeWord } from "@/utils/captilizeWord";
import injectedJS from "@/utils/webViewUtils/webViewInjectedJS";

type ExtractedStudentDataType = {
  firstname: string;
  surname: string;
  faculty: string;
  gender: string;
  religion: string;
};

export default function VerificationScreen() {
  const [showWebView, setShowWebView] = useState(false);
  const router = useRouter();
  const reuableStyles = useReuseableStyles();
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [faculty, setFaculty] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("none");

  const [VerificationStatus, setVerificationStatus] = useState("Pending");

  const webViewRef = useRef<WebView>(null);

  const handleVerification = () => {
    if (
      firstname === "" ||
      surname === "" ||
      faculty === "" ||
      selectedUniversity === "none"
    ) {
      setError("All fields are required");
      return;
    } else setError("");

    setShowWebView(true);
    setIsLoading(true); // Start loading immediately
  };

  //custom hook that automatically navigates users to the profile page
  const { handleNavigationStateChange } = useWebViewRedirect({
    webViewRef,
    dashboardUrl: abuStudentDashboardUrl.href,
    profileUrl: abuStudentProfileUrl.href,
  });

  // Handle extracted data recieved from the website (i.e webview)
  const handleWebViewMessage = (event: WebViewMessageEvent) => {
    try {
      const msg = JSON.parse(event.nativeEvent.data);
      if (
        msg.type === "FORM_DATA" &&
        msg.payload &&
        Object.keys(msg.payload).length > 0
      ) {
        setShowWebView(false);

        // Save data
        const extractedStudentData = {
          firstname: captilizeWord(msg.payload.firstname),
          surname: captilizeWord(msg.payload.surname),
          faculty: captilizeWord(msg.payload.faculty),
        };

        const isFirstname =
          firstname.trim().toLowerCase() ===
          extractedStudentData.firstname.trim().toLowerCase();
        const isSurname =
          surname.trim().toLowerCase() ===
          extractedStudentData.surname.trim().toLowerCase();
        const isFaculty =
          faculty.trim().toLowerCase() ===
          extractedStudentData.faculty.trim().toLowerCase();

        if (isFirstname && isSurname && isFaculty) {
          setVerificationStatus("Successful");
        } else {
          setVerificationStatus("Failed");
        }
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  function closeOverlay() {
    setVerificationStatus("Pending");
  }

  return (
    <>
      {VerificationStatus !== "Pending" &&
        (VerificationStatus === "Successful" ? (
          <VerificationStatusComponent
            message={
              "Verification Successful\nyour details matched with\nthe university's portal!"
            }
            isSuccessful={true}
            closeOverlay={closeOverlay}
          />
        ) : (
          <VerificationStatusComponent
            message={
              "Verification Failed\nyour details didn't match with\nthe university's portal!"
            }
            isSuccessful={false}
            closeOverlay={closeOverlay}
          />
        ))}

      <CustomKeyboard>
        {!showWebView && (
          <>
            <VerifyImage />

            <TitleText text={"Verify Account"} />

            <SubTitleText text={"Let's confirm you're a student"} />

            {error && <FormErrorText error={error} />}

            <View style={reuableStyles.textInputContainer}>
              <InputField
                value={firstname}
                onChangeText={setFirstname}
                placeholder="Firstname"
              />

              <InputField
                value={surname}
                onChangeText={setSurname}
                placeholder="Surname"
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

            <TouchableOpacity onPress={handleVerification}>
              <CustomButton text={"Verify Me"} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/(public)/(auth)/Register")}
            >
              <CustomButton text={"Go to register"} />
            </TouchableOpacity>
          </>
        )}

        {/* === WEBVIEW + LOADING INDICATOR === */}
        {showWebView && (
          <View style={styles.webviewContainer}>
            <WebView
              style={styles.webview}
              source={{ uri: abuLoginPortalUrl.href, method: "GET" }}
              ref={webViewRef}
              // Enables isables JavaScript execution inside the WebView
              javaScriptEnabled={true}
              // Responsible for injecting Javascript in the browser
              injectedJavaScript={injectedJS}
              // navigates users to profile page
              onNavigationStateChange={handleNavigationStateChange}
              // Improve performance & UX
              startInLoadingState={true}
              scalesPageToFit={true}
              onLoadStart={() => setIsLoading(true)}
              onLoadEnd={() => setIsLoading(false)}
              onError={() => setIsLoading(false)}
              // Data received from webview
              onMessage={handleWebViewMessage}
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
    </>
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
