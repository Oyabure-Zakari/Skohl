import useReuseableStyles from "@/styles/reuable.styles";
import React from "react";
import Animated, { FadeInLeft, FadeOutLeft } from "react-native-reanimated";

type FormErrorTextProps = {
  error: string;
};

const FormErrorText: React.FC<FormErrorTextProps> = ({ error }) => {
  const reuableStyles = useReuseableStyles();
  return (
    <Animated.Text
      entering={FadeInLeft}
      exiting={FadeOutLeft}
      style={reuableStyles.errorText}
    >
      {error}
    </Animated.Text>
  );
};

export default FormErrorText;
