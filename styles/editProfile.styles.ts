import COLORS from "@/constants/colors";
import { StyleSheet, useWindowDimensions } from "react-native";

export default function useEditProfileStyles() {
  const { width, fontScale } = useWindowDimensions();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
    },

    header: {
      paddingHorizontal: 16,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },

    title: {
      color: COLORS.darkBlue,
      fontFamily: "Segoe_UI_Bold",
      fontSize: fontScale * 16,
    },

    formContainer: {
      flex: 1,
      marginTop: 40,
      alignItems: "center",
      justifyContent: "center",
    },

    UserBio: {
      width: width * 0.75,
      alignItems: "center",
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
      fontSize: fontScale *  12,
    },

    textInput: {
      width: width * 0.9,
      borderColor: COLORS.darkGrey,
      borderWidth: 2,
      borderRadius: 10,
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginTop: 20,
      color: COLORS.darkGrey,
      fontFamily: "Segoe_UI_Bold",
    },
  });
}
