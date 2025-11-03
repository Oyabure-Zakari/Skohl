import useReuseableStyles from "@/styles/reuable.styles";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";

type CustomKeyboardProps = {
  children: React.ReactNode;
};

const CustomKeyboard: React.FC<CustomKeyboardProps> = ({ children }) => {
  const reuableStyles = useReuseableStyles();
  return (
    <KeyboardAwareScrollView
      style={reuableStyles.container}
      contentContainerStyle={reuableStyles.keyboardAwareScrollViewStyles}
      keyboardShouldPersistTaps="handled" //lets us tap buttons even when the keyboard is open></KeyboardAwareScrollView>;
    >
      {children}
    </KeyboardAwareScrollView>
  );
};

export default CustomKeyboard;
