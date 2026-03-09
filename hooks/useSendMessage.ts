import createMessage from "@/firebase/messages/createMessage";
import { useMutation } from "@tanstack/react-query";
import * as Haptics from "expo-haptics";
import { useWindowDimensions } from "react-native";
import Toast from "react-native-toast-message";

export const useSendMessage = () => {
  const { fontScale } = useWindowDimensions();

  const { mutate: sendMessage, isPending: isSendingMessage } = useMutation({
    mutationFn: createMessage,

    onSuccess: () => {
      // Success haptic: short confirmation vibration
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    },

    onError: (error: any) => {
      // Error haptic: warning vibration
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);

      Toast.show({
        type: "error",
        text1: "Failed to send message",
        text2: `${error?.message}`,
        text1Style: { fontSize: fontScale * 16, fontFamily: "Segoe_UI_Bold" },
        text2Style: { fontSize: fontScale * 12, fontFamily: "Segoe_UI_Bold" },
      });
    },
  });

  return {
    sendMessage,
    isSendingMessage,
  };
};
