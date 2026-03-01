import COLORS from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { Send } from "react-native-gifted-chat";

export const CustomSendBtn = (props: any) => (
  <Send
    {...props}
    containerStyle={{
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 8,
      paddingBottom: 4,
    }}
  >
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Ionicons name="send" size={18} color={COLORS.lightGrey} />
    </View>
  </Send>
);
