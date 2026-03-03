import COLORS from "@/constants/colors";
import { StyleSheet, useWindowDimensions } from "react-native";

export default function useChatListStyles() {
  const { fontScale } = useWindowDimensions();

  return StyleSheet.create({
    list: {
      flex: 1,
      backgroundColor: "#fff",
    },

    listContent: {
      paddingVertical: 8,
    },

    chatRow: {
      flexDirection: "row",
      padding: 12,
      alignItems: "center",
      gap: 10,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.lightGrey,
    },

    avatar: {
      width: 56,
      height: 56,
      borderRadius: 28,
      marginRight: 12,
    },

    chatInfo: {
      flex: 1,
    },

    name: {
      fontSize: fontScale * 14,
      fontFamily: "Segoe_UI_Bold",
      color: COLORS.darkBlue,
    },

    preview: {
      fontSize: fontScale * 12,
      fontFamily: "Segoe_UI_Bold_Italic",
      color: COLORS.darkGrey,
    },

    time: {
      fontFamily: "Segoe_UI_Bold",
      color: COLORS.darkGrey,
      fontSize: fontScale * 12,
      alignSelf: "flex-start",
    },

    separator: {
      height: 1,
      backgroundColor: "#eee",
      marginLeft: 80,
    },
  });
}
