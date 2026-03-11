import AUDIO from "@/constants/audio";
import createMessage from "@/firebase/messages/createMessage";
import { useMutation } from "@tanstack/react-query";
import * as Haptics from "expo-haptics";
import { useWindowDimensions } from "react-native";
import Toast from "react-native-toast-message";
import { usePlaySound } from "./playSound";

export const useSendMessage = () => {
  const { fontScale } = useWindowDimensions();

  const { playSound } = usePlaySound();

  const { mutate: sendMessage, isPending: isSendingMessage } = useMutation({
    mutationFn: createMessage,

    onSuccess: () => {
      // Plays sound after message has sent successfully
      playSound({ soundSource: AUDIO?.message, volume: 0.04 });
    },

    onError: (error: any) => {
      playSound({ soundSource: AUDIO?.error, volume: 0.4 });
      // Error haptic: error vibration
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

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
