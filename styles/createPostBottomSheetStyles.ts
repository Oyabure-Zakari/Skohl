import COLORS from "@/constants/colors";
import { StyleSheet, useWindowDimensions } from "react-native";

export default function useCreatePostBottomSheetStyles() {
  const { width, fontScale } = useWindowDimensions();

  return StyleSheet.create({
    content: { 
      alignItems: "center", 
      paddingBottom: 200 
    },

    photoPlaceholder: {
      marginTop: 20,
      width: width * 0.45,
      height: 150,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: COLORS.lightGrey,
    },

    photoText: { 
      color: COLORS.darkGrey, 
      fontFamily: "Segoe_UI_Bold" 
    },

    postPhoto: { 
      width: 150, 
      height: 150, 
      borderRadius: 10, 
      marginTop: 20 
    },

    photoOptions: { 
      flexDirection: "row", 
      gap: 12, 
      marginTop: 
      10 
    },

    photoOption: {
      backgroundColor: COLORS.lightGrey,
      width: 40,
      height: 40,
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
    },

  formContainer: {
    marginVertical: 20,
    width: "100%",
    alignItems: "center",
    gap: 15,
  },

  input: {
    width: width * 0.9,
    backgroundColor: COLORS.lightGrey,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: COLORS.darkGrey,
    fontFamily: "Segoe_UI_Bold",
    minHeight: 48,
  },
  });
}
