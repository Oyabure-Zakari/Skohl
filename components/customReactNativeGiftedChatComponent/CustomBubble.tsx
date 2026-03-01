import COLORS from "@/constants/colors";
import { Bubble } from "react-native-gifted-chat";

const CustomBubble = (props: any) => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          // Your own sent message bubble
          backgroundColor: COLORS.purple,
          borderRadius: 10,
          marginBottom: 4,
        },
        left: {
          // Other person's received message bubble
          backgroundColor: COLORS.darkBlue,
          borderRadius: 10,
          marginBottom: 4,
        },
      }}
      textStyle={{
        right: {
          color: COLORS.lightGrey,
          fontFamily: "Segoe_UI_Bold",
          fontSize: 14,
        },
        left: {
          color: COLORS.lightGrey,
          fontFamily: "Segoe_UI_Bold",
          fontSize: 14,
        },
      }}
      timeTextStyle={{
        right: { color: "rgba(255,255,255,0.6)", fontSize: 11 },
        left: { color: "rgba(255,255,255,0.6)", fontSize: 11 },
      }}
    />
  );
};

export default CustomBubble;
