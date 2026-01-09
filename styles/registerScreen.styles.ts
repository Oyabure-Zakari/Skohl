import { StyleSheet } from "react-native";

export default function useRegisterScreenStyles() {
  return StyleSheet.create({
    profile: {
      flexDirection: "row",
      alignSelf: "center",
    },

    image: {
      alignSelf: "center",
      width: 75,
      height: 75,
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
