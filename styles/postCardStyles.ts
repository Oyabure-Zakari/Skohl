import COLORS from "@/constants/colors";
import { StyleSheet, useWindowDimensions } from "react-native";

const usePostCardStyles = () => {
  const { width, fontScale } = useWindowDimensions();

  return StyleSheet.create({
    postsContainer: {
      backgroundColor: COLORS.white,
      borderRadius: 12,
      marginVertical: 8,
      overflow: "hidden",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
    },

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

    postDescription: {
      marginTop: 8,
      paddingHorizontal: 10,
      fontSize: 13,
      fontFamily: "Segoe_UI_Bold",
      color: COLORS.darkGrey,
      borderBottomWidth: 1,
      borderColor: COLORS.lightGrey,
    },

    postCatergory: {
      fontSize: 12,
      color: COLORS.darkGrey,
      marginTop: 4,
      fontFamily: "Segoe_UI_Bold",
    },

    postPrice: {
      fontSize: fontScale * 13,
      fontFamily: "Segoe_UI_Bold_Italic",
      color: COLORS.darkGrey,
    },
  });
};

export default usePostCardStyles;
