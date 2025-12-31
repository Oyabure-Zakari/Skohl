import useReuseableStyles from "@/styles/reuable.styles";
import React from "react";
import Animated, { FadeInLeft } from "react-native-reanimated";

type SubTitleTextProps = {
  text: string;
};

const SubTitleText: React.FC<SubTitleTextProps> = ({ text }) => {
  const styles = useReuseableStyles();
  return (
    <Animated.Text entering={FadeInLeft.delay(800)} style={styles.subTitleText}>
      {text}
    </Animated.Text>
  );
};

export default SubTitleText;
