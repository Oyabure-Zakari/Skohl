import COLORS from "@/constants/colors";
import { StyleSheet, useWindowDimensions } from "react-native";

export default function useSendFeedBottomSheetStyles() {
  const { width, fontScale } = useWindowDimensions();

  return StyleSheet.create({
    input: {
      width: width * 0.9,
      backgroundColor: COLORS.lightGrey,
      borderRadius: 10,
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginVertical: 20,
      color: COLORS.darkGrey,
      fontFamily: "Segoe_UI_Bold",
    },

    ratingContainer: {
      gap: 10,
      alignItems: "center",
      paddingVertical: 20,
    },

    ratingText: {
      color: COLORS.darkGrey,
      fontFamily: "Segoe_UI_Bold",
      fontSize: fontScale * 16,
    },
  });
}
