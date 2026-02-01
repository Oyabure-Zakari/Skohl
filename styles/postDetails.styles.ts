import COLORS from "@/constants/colors";
import { StyleSheet, useWindowDimensions } from "react-native";

const usePostDetailsStyles = () => {
  const { fontScale, width } = useWindowDimensions();

  return StyleSheet.create({
    backButton: {
      backgroundColor: COLORS.white,
      borderRadius: 40,
      padding: 2,
      margin: 16,
      position: "absolute",
      top: 0,
      left: 0,
    },

    userInfoContainer: {
      marginTop: 20,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },

    userNameText: {
      fontSize: fontScale * 14,
      fontFamily: "Segoe_UI_Bold",
      color: COLORS.darkBlue,
    },

    postTimeText: {
      fontSize: fontScale * 12,
      color: COLORS.darkGrey,
      fontFamily: "Segoe_UI_Bold",
    },

    postTitle: {
      width: width * 0.8,
      fontSize: fontScale * 20,
      fontFamily: "Segoe_UI_Bold_Italic",
      color: COLORS.darkBlue,
    },

    postCategory: {
      fontSize: fontScale * 14,
      color: COLORS.darkGrey,
      fontFamily: "Segoe_UI_Bold",
    },

    infoText: {
      fontSize: fontScale * 14,
      fontFamily: "Segoe_UI_Bold",
    },

    infoText2: {
      fontSize: fontScale * 14,
      fontFamily: "Segoe_UI_Bold_Italic",
      color: COLORS.darkGrey,
    },

    postDescriptionTitle: {
      width: width * 0.3,
      fontSize: fontScale * 16,
      fontFamily: "Segoe_UI_Bold_Italic",
      color: COLORS.purple,
      marginTop: 20,
      backgroundColor: COLORS.lightGrey,
      paddingHorizontal: 8,
      borderRadius: 6,
      textAlign: "center",
      height: 30,
    },

    postDescription: {
      fontSize: fontScale * 14,
      fontFamily: "Segoe_UI_Bold",
      color: COLORS.darkBlue,
      marginTop: 8,
    },

    chatBtn: {
      width: width * 0.92,
      paddingVertical: 8,
      backgroundColor: COLORS.darkBlue,
      borderRadius: 10,
      alignSelf: "center",
      elevation: 6,
      marginVertical: 40,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 8,
    },

    chatBtnText: {
      color: COLORS.lightGrey,
      fontFamily: "Segoe_UI_Bold",
      fontSize: fontScale * 18,
      textAlign: "center",
    },
  });
};

export default usePostDetailsStyles;
