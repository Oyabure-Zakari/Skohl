import { StyleSheet } from "react-native";

const cameraStyles = StyleSheet.create({
  grantPermissionContainer: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  cameraContainer: StyleSheet.absoluteFillObject,

  camera: StyleSheet.absoluteFillObject,

  shutterContainer: {
    position: "absolute",
    bottom: 44,
    left: 0,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: 30,
  },

  shutterBtn: {
    backgroundColor: "transparent",
    borderWidth: 5,
    borderColor: "white",
    width: 85,
    height: 85,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
  },

  shutterBtnInner: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
});

export default cameraStyles;