// React
import React, { useRef, useState } from "react";
// React Native
import { TextInput, View } from "react-native";
// Packages
import { WebView } from "react-native-webview";
// Expo
import Constants from "expo-constants";
import { useRouter } from "expo-router";
// Components
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
// Hooks
import useWebViewHandleMessage from "@/hooks/webViewHandleMessage";
import useWebViewRedirect from "@/hooks/webViewRedirect";
// URLs
import { abuLoginPortalUrl, abuStudentDashboardUrl, abuStudentProfileUrl } from "@/urls/ABU";
// Styles
import useReuseableStyles from "@/styles/reuable.styles";
// Utils
import injectedJS from "@/utils/webViewUtils/webViewInjectedJS";

export default function VerificationScreen() {
  // State
  const [error, setError] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("none");
  const [VerificationStatus, setVerificationStatus] = useState("");
  const [isloading, setIsLoading] = useState(false);
  const [isWebViewOpen, setIsWebViewOpen] = useState(false);

  // Refs
  const firstnameInputRef = useRef("");
  const surnameInputRef = useRef("");
  const textInputRef = useRef<TextInput>(null);
  const webViewRef = useRef<WebView>(null);

  // Hooks
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
    textInputRef,
    selectedFaculty,
    setError,
    setIsWebViewOpen,
    setVerificationStatus,
  });

  // Function to close verification component
  function closeVerificationComponent() {
    setVerificationStatus("");
  }

  // Function to navigate user to registration screen
  function goToRegistrationScreen() {
    router.replace("/(public)/(auth)/Register");
  }

  return (
    <>
      {/* Verification Component */}
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
            {/* Verification Header */}
            <VerifyImage />
            <TitleText text={"Verify Account"} />
            <SubTitleText text={"Let's confirm you're a student"} />

            {/* Error message */}
            {error && <FormErrorText error={error} />}

            {/* Form */}
            <View style={reuableStyles.textInputContainer}>
              <InputField
                textInputRef={textInputRef}
                onChangeText={(text) => (firstnameInputRef.current = text)}
                placeholder="Firstname"
                iconType={"person"}
              />

              <InputField
                textInputRef={textInputRef}
                onChangeText={(text) => (surnameInputRef.current = text)}
                placeholder="Surname"
                iconType={"person"}
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
              // Handles navigation btw pages in the website
              onNavigationStateChange={handleNavigationStateChange}
              // Injects JavaScript code to disable interactions and scrape student info and sends info back
              injectedJavaScript={injectedJS}
              // Recieves the student info
              onMessage={handleWebViewMessage}
              // WebView settings for better performance and UX
              startInLoadingState={true}
              scalesPageToFit={true}
              onLoadStart={() => setIsLoading(true)}
              onLoadEnd={() => setIsLoading(false)}
              onError={() => setIsLoading(false)}
            />

            {/* Full-screen loading overlay */}
            {isloading && <OverlayLoadingIndicator />}
          </View>
        )}
      </CustomKeyboard>
    </>
  );
}
