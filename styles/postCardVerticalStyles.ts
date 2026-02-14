import COLORS from "@/constants/colors";
import { StyleSheet, useWindowDimensions } from "react-native";

const usePostCardVerticalStyles = () => {
  const { width, fontScale } = useWindowDimensions();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
    },

    card: {
      backgroundColor: COLORS.white,
      borderRadius: 12,
      marginHorizontal: 16,
      marginVertical: 8,
      padding: 12,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
    },

    header: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
    },

    userAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 12,
    },

    userInfo: {
      flex: 1,
    },

    userName: {
      fontSize: fontScale * 14,
      color: COLORS.darkBlue,
      fontFamily: "Segoe_UI_Bold",
    },

    time: {
      fontSize: fontScale * 10,
      fontFamily: "Segoe_UI_Bold",
      color: COLORS.darkGrey,
    },

    title: {
      width: width * 0.8,
      marginBottom: 12,
      fontSize: fontScale * 20,
      fontFamily: "Segoe_UI_Bold_Italic",
    },

    productImage: {
      width: "100%",
      height: 220,
      borderRadius: 10,
      marginBottom: 12,
    },

    description: {
      fontSize: fontScale * 14,
      fontFamily: "Segoe_UI_Bold",
      color: COLORS.darkBlue,
    },

    category: {
      fontSize: fontScale * 14,
      color: COLORS.darkGrey,
      marginTop: 4,
      fontFamily: "Segoe_UI_Bold",
    },

    price: {
      fontSize: fontScale * 13,
      fontFamily: "Segoe_UI_Bold_Italic",
      color: COLORS.darkGrey,
    },

    actionBtnsContainer: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
    },

    chatBtn: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      backgroundColor: COLORS.darkBlue,
      paddingHorizontal: 8,
      height: 30,
      borderRadius: 5,
    },

    chatBtnText: {
      fontSize: fontScale * 12,
      color: COLORS.lightGrey,
      fontFamily: "Segoe_UI_Bold",
    },
  });
};

export default usePostCardVerticalStyles;
