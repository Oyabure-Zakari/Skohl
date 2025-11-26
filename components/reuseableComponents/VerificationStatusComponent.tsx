import COLORS from "@/constants/colors";
import LOTTIES from "@/constants/lottie";
import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

type VerificationStatusComponentType = {
  message: string;
  isSuccessful: boolean;
  closeOverlay?: () => void;
};

const color = "rgba(0, 0, 0, 0.6)";

const VerificationStatusComponent: React.FC<
  VerificationStatusComponentType
> = ({ message, isSuccessful, closeOverlay }) => {
  return (
    <>
      <StatusBar style="light" backgroundColor={color} />
      <View style={[styles.overlay, { backgroundColor: color }]}>
        <View style={styles.container}>
          {isSuccessful ? (
            <LottieView
              autoPlay
              style={{
                width: 100,
                height: 100,
              }}
              source={LOTTIES.verified}
            />
          ) : (
            <LottieView
              autoPlay
              speed={0.7}
              style={{
                width: 100,
                height: 100,
              }}
              source={LOTTIES.error}
            />
          )}
          <Text style={styles.text}>{message}</Text>
          {isSuccessful ? (
            <TouchableOpacity
              style={[styles.button, { backgroundColor: COLORS.green }]}
              onPress={closeOverlay}
            >
              <Text style={[styles.buttonText]}>Continue</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={closeOverlay}>
              <Text style={styles.buttonText}>Retry</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },

  container: {
    width: width * 0.8,
    padding: 20,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  button: {
    marginTop: 10,
    padding: 5,
    marginBottom: 20,
    backgroundColor: COLORS.red,
    borderRadius: 10,
    width: "40%",
  },

  buttonText: {
    fontFamily: "Segoe_UI_Bold",
    color: COLORS.lightGrey,
    fontSize: 16,
    textAlign: "center",
  },

  text: {
    fontSize: 16,
    fontFamily: "Segoe_UI_Bold",
    color: COLORS.darkBlue,
    textAlign: "center",
    marginBottom: 10,
  },
});

export default VerificationStatusComponent;
