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

    errorText: {
      color: COLORS.red,
      fontFamily: "Segoe_UI_Bold",
      fontSize: fontScale * 12,
      paddingHorizontal: 20,
    },

    textInputContainer: {
      justifyContent: "center",
      paddingHorizontal: 20,
      marginTop: 10,
      marginBottom: 30,
      gap: 20,
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
      paddingHorizontal: 8,
      flex: 1,
    },

    keyboardAwareScrollViewStyles: {
      flexGrow: 1, // allows scrolling when content grows
      justifyContent: "center",
      paddingBottom: 50,
    },

    // Styles specific to CreatePostBottomSheet and SendFeedbackBottomSheet component
    bottomSheetTitle: {
      color: COLORS.darkGrey,
      fontFamily: "Segoe_UI_Bold",
    },

    bottomSheetDivider: {
      width: "100%",
      height: 2,
      backgroundColor: COLORS.lightGrey,
      marginTop: 20,
    },

    bottomSheetSubTitle: {
      color: COLORS.darkBlue,
      fontFamily: "Segoe_UI_Bold",
      fontSize: fontScale * 16,
      marginTop: 10,
    },

    buttonTypeContainer: {
      flexDirection: "row",
      gap: 10,
      marginTop: 10,
    },

    activeButton: {
      backgroundColor: COLORS.purple,
      borderRadius: 5,
      padding: 5,
    },

    activeText: {
      color: COLORS.white,
      fontFamily: "Segoe_UI_Bold",
      fontSize: fontScale * 12,
      paddingHorizontal: 5,
    },

    inactiveButton: {
      borderColor: COLORS.purple,
      borderWidth: 1,
      borderRadius: 5,
      padding: 5,
    },

    inactiveText: {
      color: COLORS.purple,
      fontFamily: "Segoe_UI_Bold",
      fontSize: fontScale * 12,
      paddingHorizontal: 5,
    },
  });
}
