import COLORS from "@/constants/colors";
import useReuseableStyles from "@/styles/reuable.styles";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

type CustomButtonProps = {
  text: string;
  isLoading?: boolean;
};

const CustomButton: React.FC<CustomButtonProps> = ({ text, isLoading }) => {
  const styles = useReuseableStyles();
  return (
    <View style={styles.customButton}>
      {isLoading ? (
        <ActivityIndicator size="large" color={COLORS.lightGrey} />
      ) : (
        <Text style={styles.customButtonText}>{text}</Text>
      )}
    </View>
  );
};

export default CustomButton;
