import React, { useRef, useState } from "react";

import { StyleSheet, TouchableOpacity, View } from "react-native";
import { WebView } from "react-native-webview";

import Constants from "expo-constants";

import CustomButton from "@/components/reuseableComponents/CustomButton";
import CustomKeyboard from "@/components/reuseableComponents/CustomKeyboard";
import FormErrorText from "@/components/reuseableComponents/FormErrorText";
import InputField from "@/components/reuseableComponents/InputField";
import OverlayLoadingIndicator from "@/components/reuseableComponents/OverlayLoadingIndicator";
import SubTitleText from "@/components/reuseableComponents/SubTitleText";
import TitleText from "@/components/reuseableComponents/TitleText";
import VerificationLogic from "@/components/reuseableComponents/VerificationLogic";
import SelectUniPicker from "@/components/verification/SelectUniPicker";
import VerifyImage from "@/components/verification/VerifyImage";

import useReuseableStyles from "@/styles/reuable.styles";

import useWebViewRedirect from "@/hooks/webViewRedirect";

import {
  abuLoginPortalUrl,
  abuStudentDashboardUrl,
  abuStudentProfileUrl,
} from "@/urls/ABU";

import useWebViewHandleMessage from "@/hooks/webViewHandleMessage";
import openWebView from "@/utils/webViewUtils/openWebView";
import injectedJS from "@/utils/webViewUtils/webViewInjectedJS";

export default function VerificationScreen() {
  const [showWebView, setShowWebView] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const reuableStyles = useReuseableStyles();

  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [faculty, setFaculty] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState("none");

  const [VerificationStatus, setVerificationStatus] = useState("Pending");

  const webViewRef = useRef<WebView>(null);

  //custom hook that automatically navigates users to the profile page
  const { handleNavigationStateChange } = useWebViewRedirect({
    webViewRef,
    dashboardUrl: abuStudentDashboardUrl.href,
    profileUrl: abuStudentProfileUrl.href,
  });

  // Handle extracted data recieved from the website (i.e webview)
  const { studentProfile, handleWebViewMessage } = useWebViewHandleMessage({
    firstname,
    surname,
    faculty,
    setError,
    setShowWebView,
    setVerificationStatus,
  });

  function closeVerificationComponent() {
    setVerificationStatus("Pending");
  }

  console.log("Student Profile: ", studentProfile);

  return (
    <>
      {VerificationStatus !== "Pending" && (
        <VerificationLogic
          VerificationStatus={VerificationStatus}
          closeVerificationComponent={closeVerificationComponent}
        />
      )}

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

            {/* Button that open webview after form has been validated*/}
            <TouchableOpacity
              onPress={() =>
                openWebView(
                  firstname,
                  surname,
                  faculty,
                  selectedUniversity,
                  setError,
                  setShowWebView,
                  setIsLoading
                )
              }
            >
              <CustomButton text={"Verify Me"} />
            </TouchableOpacity>
          </>
        )}

        {/* Webview and loading indicator */}
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
            {isloading && <OverlayLoadingIndicator />}
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
});
