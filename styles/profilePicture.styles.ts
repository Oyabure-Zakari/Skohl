import COLORS from "@/constants/colors";
import { StyleSheet, useWindowDimensions } from "react-native";

export default function useProfilePictureStyles() {
  const { width, fontScale } = useWindowDimensions();

  return StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
    //paddingVertical: 4,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  profilePicture: {
    width: width * 0.9,
    height: 350,
    alignSelf: "center",
    borderRadius: 5,
    resizeMode: "cover",
    overflow: "hidden",
    marginTop: 150,
    //backgroundColor: "red",
  },

  editBtn: {
    borderColor: COLORS.lightGrey,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    width: width * 0.2,
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: 40,
  },

  editBtnText: {
    textAlign: "center",
    color: COLORS.lightGrey,
    fontFamily: "Segoe_UI_Bold",
    fontSize: fontScale * 12,
    paddingHorizontal: 5,
  },
});
}