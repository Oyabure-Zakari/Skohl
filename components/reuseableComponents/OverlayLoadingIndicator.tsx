import React from "react";
import { StyleSheet, View } from "react-native";

import LOTTIES from "@/constants/lottie";
import LottieView from "lottie-react-native";

const OverlayLoadingIndicator = () => {
  return (
    <View style={styles.loadingOverlay}>
      <LottieView
        autoPlay
        style={{
          width: 150,
          height: 150,
        }}
        source={LOTTIES.loading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
});

export default OverlayLoadingIndicator;
