import COLORS from "@/constants/colors";
import { Composer, InputToolbar } from "react-native-gifted-chat";

export const CustomInputToolbar = (props: any) => (
  <InputToolbar
    {...props}
    containerStyle={{
      backgroundColor: COLORS.darkBlue,
      borderTopWidth: 0,
      paddingHorizontal: 10,
      paddingVertical: 8,
      marginHorizontal: 12,
      marginBottom: 10,
      borderRadius: 30,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    }}
    primaryStyle={{ alignItems: "center" }}
  />
);

export const CustomComposer = (props: any) => (
  <Composer
    {...props}
    textInputStyle={{
      color: COLORS.lightGrey,
      fontFamily: "Segoe_UI_Bold_Italic",
      fontSize: 14,
      lineHeight: 20,
      paddingTop: 8,
      paddingHorizontal: 10,
    }}
    placeholderTextColor="rgba(0,0,0,0.4)"
    placeholder="Type a message..."
  />
);
