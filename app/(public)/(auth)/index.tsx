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
import { WebView, WebViewNavigation } from "react-native-webview";

import FormErrorText from "@/components/reuseableComponents/FormErrorText";
import COLORS from "@/constants/colors";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

type StudentInfoType = {
  Firstname: string;
  Surname: string;
  Department: string;
  Faculty: string;
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
  const [isStudentVerified, setIsStudentVerified] = useState(false);
  const [studentInfo, setStudentInfo] = useState<StudentInfoType>();

  const abuLoginPortalUrl = new URL("https://portal.abu.edu.ng/");
  const abuStudentProfileUrl = new URL(
    "https://portal.abu.edu.ng/notification/profile"
  );
  const abuStudentDashboardUrl = new URL(
    "https://portal.abu.edu.ng/notification/dashboard"
  );
  const webViewRef = useRef<WebView>(null);

  //this automatically navigates users to the profile page
  const handleNavigationStateChange = (navState: WebViewNavigation) => {
    const { url } = navState;

    // Detect when the site tries to redirect to the dashboard after login
    if (url.startsWith(abuStudentDashboardUrl.href)) {
      // Force navigation to your desired profile page
      webViewRef.current?.injectJavaScript(`
        window.location.href = "${abuStudentProfileUrl}";
        true; // <- important: prevents React Native warning
      `);
    }
  };

  const injectedJS =
    // disable clickable elements
    `
    (function() {
      // Disable all pointer events (most effective)
      document.body.style.pointerEvents = 'none';
      
      // Optional: also remove any existing click handlers
      document.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }, true);

      // Optional: disable touch events too (extra safety)
      document.addEventListener('touchstart', function(e) {
        e.preventDefault();
      }, true);

      true; // Required for RN WebView
    })();
  `;

  const handleVerification = () => {
    if (
      firstname === "" ||
      surname === "" ||
      faculty === "" ||
      selectedUniversity === "none"
    ) {
      setError("All fields are required");
      return;
    }

    setShowWebView(true);
    setIsLoading(true); // Start loading immediately
  };

  return (
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
            // navigates users to profile page
            onNavigationStateChange={handleNavigationStateChange}
            injectedJavaScript={injectedJS}
            // Enables localStorage and sessionStorage
            // domStorageEnabled={true}
            // Optional: improve performance & UX
            startInLoadingState={true}
            scalesPageToFit={true}
            onLoadStart={() => setIsLoading(true)}
            onLoadEnd={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
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
