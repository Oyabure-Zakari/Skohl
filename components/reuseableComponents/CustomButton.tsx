import useReuseableStyles from "@/styles/reuable.styles";
import React from "react";
import { Text, View } from "react-native";

type CustomButtonProps = {
  text: string;
};

const CustomButton: React.FC<CustomButtonProps> = ({ text }) => {
  const styles = useReuseableStyles();

  return (
    <View style={styles.customButton}>
      <Text style={styles.customButtonText}>{text}</Text>
    </View>
  );
};

export default CustomButton;
