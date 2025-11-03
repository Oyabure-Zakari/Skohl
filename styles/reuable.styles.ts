import COLORS from "@/constants/colors";
import { StyleSheet, useWindowDimensions } from "react-native";

export default function useReuseableStyles() {
  const { width, height, fontScale } = useWindowDimensions();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
    },

    image: {
      width: width * 0.6,
      height: height * 0.3,
      resizeMode: "contain",
      alignSelf: "center",
      // backgroundColor: "red"
    },

    titleText: {
      color: COLORS.darkBlue,
      fontFamily: "Segoe_UI_Bold",
      fontSize: fontScale * 30,
      paddingHorizontal: 20,
    },

    subTitleText: {
      color: COLORS.darkGrey,
      fontFamily: "Segoe_UI_Bold_Italic",
      fontSize: fontScale * 15,
      paddingHorizontal: 20,
      marginBottom: 10,
    },

    textInputContainer: {
      justifyContent: "center",
      paddingHorizontal: 20,
      marginTop: 10,
    },

    customButton: {
      width: width * 0.9,
      paddingVertical: 10,
      backgroundColor: COLORS.darkBlue,
      borderRadius: 10,
      alignSelf: "center",
      elevation: 6,
      marginBottom: 20,
    },

    customButtonText: {
      color: COLORS.lightGrey,
      fontFamily: "Segoe_UI_Bold",
      fontSize: fontScale * 18,
      textAlign: "center",
    },

    footer: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 5,
      paddingBottom: 20,
    },

    footerText1: {
      color: COLORS.darkGrey,
    },

    footerText2: {
      color: COLORS.purple,
    },

    textInputStyles: {
      color: COLORS.darkGrey,
      fontFamily: "Segoe_UI_Bold",
      backgroundColor: COLORS.lightGrey,
      borderRadius: 10,
      paddingHorizontal: 16,
      marginBottom: 20,
    },

    keyboardAwareScrollViewStyles: {
      flexGrow: 1, // allows scrolling when content grows
      justifyContent: "center",
      paddingBottom: 50,
    },
  });
}
