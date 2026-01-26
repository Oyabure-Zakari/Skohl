import COLORS from "@/constants/colors";
import { StyleSheet, useWindowDimensions } from "react-native";

const usePostCardStyles = () => {
  const { width, fontScale } = useWindowDimensions();

  return StyleSheet.create({
    postHeaderContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: 5,
    },

    postHeaderInfo: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },

    userImage: {
      width: 28,
      height: 28,
      borderRadius: 14,
      marginRight: 8,
    },

    userName: {
      fontSize: fontScale * 12,
      color: COLORS.darkBlue,
      fontFamily: "Segoe_UI_Bold",
      width: width * 0.5,
    },

    postTime: {
      fontSize: fontScale * 10,
      fontFamily: "Segoe_UI_Bold",
      color: COLORS.darkGrey,
    },
  });
};

export default usePostCardStyles;
