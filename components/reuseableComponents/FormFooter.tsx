import useReuseableStyles from "@/styles/reuable.styles";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import FooterText1 from "./FooterText1";
import FooterText2 from "./FooterText2";

type FormFooterProps = {
  footerText1: string;
  footerText2: string;
  navigateToLoginOrRegister: () => void;
};

const FormFooter: React.FC<FormFooterProps> = ({
  footerText1,
  footerText2,
  navigateToLoginOrRegister,
}) => {
  const reuableStyles = useReuseableStyles();

  return (
    <View style={reuableStyles.footer}>
      <FooterText1 text={footerText1} />
      <TouchableOpacity onPress={navigateToLoginOrRegister}>
        <FooterText2 text={footerText2} />
      </TouchableOpacity>
    </View>
  );
};

export default FormFooter;
