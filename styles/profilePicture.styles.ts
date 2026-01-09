import COLORS from "@/constants/colors";
import { StyleSheet, useWindowDimensions } from "react-native";

export default function useProfilePictureStyles() {
  const { width, fontScale } = useWindowDimensions();

  return StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 20,
  },

  profilePicture: {
    width: width * 0.9,
    height: 350,
    alignSelf: "center",
    borderRadius: 5,
    resizeMode: "cover",
    overflow: "hidden",
    marginVertical: 100,
    //backgroundColor: "red",
  },

  editBtn: {
    borderColor: COLORS.lightGrey,
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    width: width * 0.2,
    alignSelf: "center",
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