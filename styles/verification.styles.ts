import COLORS from "@/constants/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  form: {
    width: "90%",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: COLORS.darkBlue,
    paddingVertical: 40,

    shadowColor: "rgba(0,0,0,0.9)",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.75,
    shadowRadius: 6,
    elevation: 6,

    // Allow shadow to be visible
    overflow: "visible",

    // Slightly stronger border for contrast
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.25)",
  },

  titleText: {
    color: COLORS.lightGrey,
    fontFamily: "Segoe_UI_Bold",
    fontSize: 30,
    paddingHorizontal: 20,
  },

  subTitleText: {
    color: COLORS.darkGrey,
    fontFamily: "Segoe_UI_Bold_Italic",
    fontSize: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
  },

  textInputContainer: {
    justifyContent: "center",
    paddingHorizontal: 20,
    marginTop: 10,
  },

  verifyButton: {
    width: "100%",
    paddingVertical: 10,
    backgroundColor: COLORS.purple,
    borderRadius: 10,
  },

  verifyButtnText: {
    color: COLORS.lightGrey,
    fontFamily: "Segoe_UI_Bold",
    fontSize: 18,
    textAlign: "center",
  },
});

export default styles;
