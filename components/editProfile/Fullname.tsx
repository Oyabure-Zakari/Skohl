import useEditProfileStyles from "@/styles/editProfile.styles";
import React from "react";
import Animated, { FadeInUp } from "react-native-reanimated";

type FullnameProps = {
  fullName: string;
};

const Fullname: React.FC<FullnameProps> = ({ fullName }) => {
  // Styles
  const editProfileStyles = useEditProfileStyles();

  return (
    <Animated.Text entering={FadeInUp.delay(600)} style={editProfileStyles.fullName}>
      {fullName}
    </Animated.Text>
  );
};

export default Fullname;
