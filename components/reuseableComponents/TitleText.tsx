import useReuseableStyles from "@/styles/reuable.styles";
import React from "react";
import Animated, { FadeInLeft } from "react-native-reanimated";

type TitleTextProps = {
  text: string;
};

const TitleText: React.FC<TitleTextProps> = ({ text }) => {
  const styles = useReuseableStyles();
  return (
    <Animated.Text entering={FadeInLeft.delay(400)} style={styles.titleText}>
      {text}
    </Animated.Text>
  );
};

export default TitleText;
