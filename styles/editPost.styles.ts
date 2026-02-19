import COLORS from "@/constants/colors";
import { StyleSheet, useWindowDimensions } from "react-native";

export default function useEditPostStyles() {
  const {width, fontScale} = useWindowDimensions();

  return StyleSheet.create({
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      alignItems: "center",
      backgroundColor: COLORS.white,
    },
  
    headerBtn: {
      backgroundColor: COLORS.lightGrey,
      borderRadius: 40,
      padding: 2,
    },
  
    headerTitle: {
      color: COLORS.darkBlue,
      fontSize: fontScale * 14,
      fontFamily: "Segoe_UI_Bold",
    },
  
    container: {
      backgroundColor: COLORS.white,
      alignItems: "center",
    },
  
    photoPlaceholder: {
      marginTop: 20,
      width:width * 0.45,
      height: 150,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: COLORS.lightGrey,
    },
  
    photoText: {
      color: COLORS.darkGrey,
      fontFamily: "Segoe_UI_Bold",
    },
  
    postPhoto: {
      width: 150,
      height: 150,
      borderRadius: 10,
      marginTop: 20,
    },
  
    formContainer: {
      marginVertical: 20,
      width: "100%",
      alignItems: "center",
    },
  
    inputName: {
      color: COLORS.darkBlue,
      fontFamily: "Segoe_UI_Bold",
      fontSize: fontScale * 14,
      alignSelf: "flex-start",
      paddingHorizontal: 16,
      marginBottom: 4,
    },
  
    input: {
      width: width * 0.9,
      backgroundColor: COLORS.lightGrey,
      borderRadius: 10,
      paddingHorizontal: 16,
      paddingVertical: 12,
      color: COLORS.darkGrey,
      fontFamily: "Segoe_UI_Bold_Italic",
      minHeight: 48,
      marginBottom: 15,
    },
  });
}