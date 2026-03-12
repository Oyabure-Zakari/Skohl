import { ERRORSOUND, MESSAGESOUND } from "@/constants/soundConfig";
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
      playSound(MESSAGESOUND);
    },

    onError: (error: any) => {
      // Plays error sound
      playSound(ERRORSOUND);

      // Haptic  feedback
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

      // Toast notification
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
