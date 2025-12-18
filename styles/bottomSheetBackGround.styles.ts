import COLORS from "@/constants/colors";
import { StyleSheet } from "react-native";

const bottomSheeBackgroundStyle = StyleSheet.create({
    backgroundStyle: {
          backgroundColor: COLORS.white,
          borderRadius: 10,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 20,
        }
  });
export default bottomSheeBackgroundStyle;