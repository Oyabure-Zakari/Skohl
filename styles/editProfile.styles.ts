import COLORS from "@/constants/colors";
import { StyleSheet, useWindowDimensions } from "react-native";

export default function useEditProfileStyles() {
  const { width, fontScale } = useWindowDimensions();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
    },

    pattern: {
      height: "30%",
      width: "100%",
      alignSelf: "center",
      position: "absolute",
      top: -40,
      zIndex: 1000,
    },

    header: {
      paddingHorizontal: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: COLORS.darkBlue,
      zIndex: 2000,
    },

    title: {
      color: COLORS.white,
      fontFamily: "Segoe_UI_Bold",
      fontSize: fontScale * 16,
    },

    formContainer: {
      flex: 1,
      marginTop: 40,
      alignItems: "center",
      justifyContent: "center",
    },

    profilePicture: {
      width: 140,
      height: 140,
      borderColor: COLORS.white,
      borderWidth: 6,
      borderRadius: 100,
      overflow: "hidden",
      zIndex: 2000,
    },

    fullName: {
      color: COLORS.darkBlue,
      fontFamily: "Segoe_UI_Bold",
      fontSize: fontScale * 16,
      textAlign: "center",
    },

    bio: {
      fontFamily: "Segoe_UI_Bold",
      textAlign: "center",
      color: COLORS.darkGrey,
      fontSize: fontScale * 12,
    },

    textInput: {
      width: width * 0.8,
      borderColor: COLORS.darkGrey,
      borderBottomWidth: 2,
      textAlign: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
      color: COLORS.darkGrey,
      fontFamily: "Segoe_UI_Bold",
    },
  });
}
