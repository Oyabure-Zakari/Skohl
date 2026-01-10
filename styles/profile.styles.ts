import COLORS from "@/constants/colors";
import { StyleSheet, useWindowDimensions } from "react-native";

export default function useProfileScreenStyles() {
  const { width, fontScale } = useWindowDimensions();

  return StyleSheet.create({
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      //backgroundColor: COLORS.darkGrey,
    },

    profile: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      //backgroundColor: "red",
    },

    editProfileBtn: {
      backgroundColor: COLORS.darkBlue,
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 5,
      elevation: 6,
    },

    editProfileBtnText: {
      color: COLORS.lightGrey,
      fontSize: fontScale * 14,
      fontFamily: "Segoe_UI_Bold",
      textAlign: "center",
    },

    logOutBtn: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 5,
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },

    logOutBtnText: {
      color: COLORS.red,
      fontSize: fontScale * 14,
      fontFamily: "Segoe_UI_Bold",
      textAlign: "center",
    },

    bioContainer: {
      paddingHorizontal: 16,
    },

    bioText1: {
      fontSize: fontScale * 18,
      fontFamily: "Segoe_UI_Bold",
      color: COLORS.darkBlue,
      width: width * 0.52, // To prevent long names from overflowing
    },

    bioText2: {
      fontSize: fontScale * 14,
      fontFamily: "Segoe_UI_Bold",
      color: COLORS.darkGrey,
    },

    lottieStyle: {
      width: width * 1,
      height: 200,
    },
  });
}
