import styles from "@/styles/verification.styles";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

const VerifyButton = () => {
  const router = useRouter();

  const handleVerification = () => {
    router.push("/(public)/(auth)/Register");
  };
  return (
    <TouchableOpacity style={styles.verifyButton} onPress={handleVerification}>
      <Text style={styles.verifyButtnText}>Verify Me</Text>
    </TouchableOpacity>
  );
};

export default VerifyButton;
