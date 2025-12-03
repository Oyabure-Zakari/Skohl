import { StyleSheet, useWindowDimensions } from "react-native";

export default function useRegisterScreenStyles() {
  const { width } = useWindowDimensions();

  return StyleSheet.create({
    profile: {
      flexDirection: "row",
      alignSelf: "center",
    },

    image: {
      alignSelf: "center",
      width: width * 0.2,
      height: width * 0.2,
      resizeMode: "contain",
      marginBottom: 20,
      borderRadius: 50,
      // backgroundColor: "red",
    },

    editButton: {
      alignSelf: "center",
      position: "relative",
      bottom: -15,
      right: 18,
    },
  });
}
