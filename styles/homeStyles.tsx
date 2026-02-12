import COLORS from "@/constants/colors";
import { StyleSheet } from "react-native";

export default function useHomeStyles() {
  return StyleSheet.create({
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      backgroundColor: COLORS.darkBlue,
      paddingBottom: 20,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 50,
      alignItems: "center",
    },

    userName: {
      fontSize: 18,
      fontFamily: "Segoe_UI_Bold",
      color: COLORS.lightGrey,
      width: "80%",
    },

    divider: {
      width: "100%",
      height: 2,
      backgroundColor: COLORS.lightGrey,
      marginTop: 10,
    },

    categoryContainer: {
      marginTop: 20,
      paddingHorizontal: 4,
    },

    categoryTitle: {
      fontSize: 18,
      fontFamily: "Segoe_UI_Bold",
      color: COLORS.purple,
      paddingHorizontal: 16,
      marginBottom: 6,
    },
  });
}
