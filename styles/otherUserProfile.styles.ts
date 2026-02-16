import COLORS from "@/constants/colors";
import { StyleSheet, useWindowDimensions } from "react-native";

export default function useOtherUserProfileStyles() {
  const { fontScale } = useWindowDimensions();

  return StyleSheet.create({
    profileHeaderContainer: {
      paddingHorizontal: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    chatBtn: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      backgroundColor: COLORS.darkBlue,
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 5,
      elevation: 6,
    },

    chatText: {
      color: COLORS.lightGrey,
      fontSize: fontScale * 14,
      fontFamily: "Segoe_UI_Bold",
      textAlign: "center",
    },

    titleContainer: {
      backgroundColor: COLORS.purple,
      borderRadius: 5,
      padding: 5,
      marginTop: 10,
      width: 100,
      alignSelf: "center",
    },

    titleText: {
      color: COLORS.white,
      fontFamily: "Segoe_UI_Bold",
      fontSize: fontScale * 12,
      textAlign: "center",
    },
  });
}
