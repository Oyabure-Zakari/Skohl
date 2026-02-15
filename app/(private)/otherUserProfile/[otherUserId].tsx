// React
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text } from "react-native";

export default function OtherUserProfile() {
  // User id
  const { otherUserId } = useLocalSearchParams();

  return <Text>{otherUserId}</Text>;
}
