import COLORS from "@/constants/colors";
import IMAGES from "@/constants/images";
import React from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function RegisterScreen() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.darkBlue} />
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: COLORS.darkBlue,
        }}
      >
        <View style={styles.topHalf}>
          <Image
            source={IMAGES.letter0}
            style={{ marginTop: "10%", opacity: 0.5 }}
          />
        </View>
        <View style={styles.bottomHalf}>
          <Text style={styles.titleText}>Create Account</Text>
          <Text style={styles.subTitleText}>Sign up to continue</Text>
          <View style={styles.registerContainer}>
            <View style={styles.registerForm}>
              <TextInput
                placeholder="Email"
                placeholderTextColor={COLORS.darkGrey}
                style={{
                  color: COLORS.darkGrey,
                  fontFamily: "Segoe_UI_Bold",
                  backgroundColor: COLORS.lightGrey,
                  paddingHorizontal: 16,
                  borderRadius: 10,
                  marginBottom: 20,
                }}
              />
              <TextInput
                placeholder="Password"
                placeholderTextColor={COLORS.darkGrey}
                style={{
                  color: COLORS.darkGrey,
                  fontFamily: "Segoe_UI_Bold",
                  backgroundColor: COLORS.lightGrey,
                  paddingHorizontal: 16,
                  borderRadius: 10,
                  marginBottom: 20,
                }}
              />
              <TextInput
                placeholder="Confirm Password"
                placeholderTextColor={COLORS.darkGrey}
                style={{
                  color: COLORS.darkGrey,
                  fontFamily: "Segoe_UI_Bold",
                  backgroundColor: COLORS.lightGrey,
                  borderRadius: 10,
                  marginBottom: 20,
                  paddingHorizontal: 16,
                }}
              />
            </View>

            {/* shadow wrapper provides an even shadow around the button border */}
            <View style={styles.signUpShadowWrapper}>
              <TouchableOpacity style={styles.signUpButton}>
                <Text style={styles.signUpButtnText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.signInText1}>
              Already have an account?{" "}
              <Text
                onPress={() => {
                  console.log("Login");
                }}
                style={styles.signInText2}
              >
                Sign In
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  topHalf: {
    alignItems: "center",
    backgroundColor: COLORS.darkBlue,
    width: "100%",
    height: "40%",
  },
  bottomHalf: {
    backgroundColor: COLORS.white,
    width: "100%",
    height: "60%",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  titleText: {
    color: COLORS.darkBlue,
    fontFamily: "Segoe_UI_Bold",
    fontSize: 30,
    paddingHorizontal: 20,
  },

  subTitleText: {
    color: COLORS.darkGrey,
    fontFamily: "Segoe_UI_Bold_Italic",
    fontSize: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
  },

  registerContainer: {
    flex: 1,
  },

  registerForm: {
    paddingHorizontal: 20,
  },

  // wrapper holds the shadow so it appears around the full border
  signUpShadowWrapper: {
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    // iOS shadow (centered around border)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.28,
    shadowRadius: 4,
    // Android elevation
    elevation: 4,
    // allow the shadow to be visible outside the wrapper bounds
    overflow: "visible",
    marginTop: 12,
  },

  signUpButton: {
    width: "100%", // fill wrapper
    paddingVertical: 10,
    backgroundColor: COLORS.darkBlue,
    alignSelf: "center",
    borderRadius: 10,

    // Visible cross-platform shadow
    shadowColor: "#0000003f",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.35,
    shadowRadius: 0,
    elevation: 8,
    overflow: "visible",
  },

  signUpButtnText: {
    color: COLORS.lightGrey,
    fontFamily: "Segoe_UI_Bold",
    fontSize: 18,
    textAlign: "center",
  },

  signInText1: {
    color: COLORS.darkGrey,
    fontFamily: "Segoe_UI_Bold",
    fontSize: 15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    textAlign: "center",
  },

  signInText2: {
    color: COLORS.purple,
    fontFamily: "Segoe_UI_Bold",
    fontSize: 15,
  },
});
