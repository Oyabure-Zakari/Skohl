import COLORS from "@/constants/colors";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { FloatingAction } from "react-native-floating-action";

const FloatingActionButton: React.FC = () => {
  const actions = [
    {
      text: "Send Feedback",
      icon: <MaterialIcons name="dynamic-feed" size={24} color={COLORS.darkBlue} />,
      name: "bt_send_feedback",
      color: COLORS.lightGrey,
      position: 1,
    },
    {
      text: "Create Post",
      icon: <MaterialCommunityIcons name="post" size={24} color={COLORS.darkBlue} />,
      name: "bt_create_post",
      color: COLORS.lightGrey,
      position: 2,
    },
  ];
  return (
    <FloatingAction
      actions={actions}
      color={COLORS.purple}
      onPressItem={(name) => {
        console.log(`selected button: ${name}`);
      }}
    />
  );
};

export default FloatingActionButton;
