import COLORS from "@/constants/colors";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Dispatch, SetStateAction } from "react";
import { FloatingAction } from "react-native-floating-action";

type FloatingActionButtonProps = {
  setActiveBottomSheet: Dispatch<SetStateAction<"Create Post" | "Send Feedback">>;
  handleSnapPress: (index: number) => void;
};

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  setActiveBottomSheet,
  handleSnapPress,
}) => {
  const openBottomSheet = (name: string | undefined) => {
    if (name === "bt_send_feedback") {
      setActiveBottomSheet("Send Feedback");
      console.log("Send Feedback");
      handleSnapPress(1);
    }
    if (name === "bt_create_post") {
      setActiveBottomSheet("Create Post");
      console.log("Create Post");
      handleSnapPress(1);
    }
  };
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
        openBottomSheet(name);
      }}
    />
  );
};

export default FloatingActionButton;
