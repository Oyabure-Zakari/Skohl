import COLORS from "@/constants/colors";
import { StyleSheet, useWindowDimensions } from "react-native";

export default function useChatRoomStyles() {
  const { fontScale } = useWindowDimensions();

  return StyleSheet.create({
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      backgroundColor: COLORS.darkBlue,
    },

    headerNameText: {
      fontSize: fontScale * 18,
      fontFamily: "Segoe_UI_Bold_Italic",
      color: COLORS.lightGrey,
      width: "60%",
    },

    headerMessageCountText: {
      textAlign: "center",
      fontSize: fontScale * 14,
      fontFamily: "Segoe_UI_Bold_Italic",
      color: COLORS.lightGrey,
    },
  });
}
