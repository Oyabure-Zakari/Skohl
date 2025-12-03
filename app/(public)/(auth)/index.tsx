import React, { useRef, useState } from "react";
import { View } from "react-native";

import { WebView } from "react-native-webview";

import Constants from "expo-constants";

import CustomKeyboard from "@/components/reuseableComponents/CustomKeyboard";
import FormErrorText from "@/components/reuseableComponents/FormErrorText";
import InputField from "@/components/reuseableComponents/InputField";
import OverlayLoadingIndicator from "@/components/reuseableComponents/OverlayLoadingIndicator";
import SubTitleText from "@/components/reuseableComponents/SubTitleText";
import TitleText from "@/components/reuseableComponents/TitleText";
import VerificationLogic from "@/components/reuseableComponents/VerificationLogic";
import SelectFacultyPicker from "@/components/verification/SelectFacultyPicker";
import VerificationButton from "@/components/verification/VerificationButton";
import VerifyImage from "@/components/verification/VerifyImage";

import useWebViewHandleMessage from "@/hooks/webViewHandleMessage";
import useWebViewRedirect from "@/hooks/webViewRedirect";

import { abuLoginPortalUrl, abuStudentDashboardUrl, abuStudentProfileUrl } from "@/urls/ABU";

import useReuseableStyles from "@/styles/reuable.styles";

import injectedJS from "@/utils/webViewUtils/webViewInjectedJS";
import { useRouter } from "expo-router";

export default function VerificationScreen() {
  const [error, setError] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("none");
  const [VerificationStatus, setVerificationStatus] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [isWebViewOpen, setIsWebViewOpen] = useState(false);

  const firstnameInputRef = useRef("");
  const surnameInputRef = useRef("");
  const webViewRef = useRef<WebView>(null);

  const router = useRouter();

  // Custom hook to apply resuseable style on component
  const reuableStyles = useReuseableStyles();

  //custom hook that automatically navigates users to the profile page
  const { handleNavigationStateChange } = useWebViewRedirect({
    webViewRef,
    dashboardUrl: abuStudentDashboardUrl.href,
    profileUrl: abuStudentProfileUrl.href,
  });

  // Handle extracted data recieved from the website (i.e webview)
  const { handleWebViewMessage } = useWebViewHandleMessage({
    firstnameInputRef,
    surnameInputRef,
    selectedFaculty,
    setError,
    setIsWebViewOpen,
    setVerificationStatus,
  });

  function closeVerificationComponent() {
    setVerificationStatus("");
  }

  function goToRegistrationScreen() {
    router.replace("/(public)/(auth)/Register");
  }

  return (
    <>
      {VerificationStatus !== "" && (
        <VerificationLogic
          VerificationStatus={VerificationStatus}
          closeVerificationComponent={closeVerificationComponent}
          goToRegistrationScreen={goToRegistrationScreen}
        />
      )}

      <CustomKeyboard>
        {!isWebViewOpen && (
          <>
            <VerifyImage />

            <TitleText text={"Verify Account"} />

            <SubTitleText text={"Let's confirm you're a student"} />

            {error && <FormErrorText error={error} />}

            <View style={reuableStyles.textInputContainer}>
              <InputField
                onChangeText={(text) => (firstnameInputRef.current = text)}
                placeholder="Firstname"
              />

              <InputField
                onChangeText={(text) => (surnameInputRef.current = text)}
                placeholder="Surname"
              />

              <SelectFacultyPicker
                selectedFaculty={selectedFaculty}
                setSelectedFaculty={setSelectedFaculty}
              />
            </View>

            {/* Button that open webview once form has been validated*/}
            <VerificationButton
              firstnameInputRef={firstnameInputRef.current}
              surnameInputRef={surnameInputRef.current}
              selectedFaculty={selectedFaculty}
              setError={setError}
              setIsLoading={setIsLoading}
              setIsWebViewOpen={setIsWebViewOpen}
            />
          </>
        )}

        {/* Webview and loading indicator */}
        {isWebViewOpen && (
          <View style={{ flex: 1, marginTop: Constants.statusBarHeight }}>
            <WebView
              style={{ flex: 1 }}
              source={{ uri: abuLoginPortalUrl.href, method: "GET" }}
              ref={webViewRef}
              javaScriptEnabled={true}
              injectedJavaScript={injectedJS}
              onNavigationStateChange={handleNavigationStateChange}
              startInLoadingState={true}
              scalesPageToFit={true}
              onLoadStart={() => setIsLoading(true)}
              onLoadEnd={() => setIsLoading(false)}
              onError={() => setIsLoading(false)}
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
