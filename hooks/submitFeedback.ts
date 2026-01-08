import sendFeedback from "@/firebase/feedbacks/sendFeedback";
import { useMutation } from "@tanstack/react-query";
import { useWindowDimensions } from "react-native";
import Toast from "react-native-toast-message";

type UseSubmitFeedbackParams = {
  userUid: string;
  feedbackTextRef: React.RefObject<string>;
  rating: number;
  setRating: (rating: number) => void;
  inputRef: React.RefObject<any>; // For clearing the TextInput
};

export const useSubmitFeedback = ({
  userUid,
  feedbackTextRef,
  rating,
  setRating,
  inputRef,
}: UseSubmitFeedbackParams) => {
  // Get font scale for responsive toast text sizing
  const { fontScale } = useWindowDimensions();
  // useMutation gives us methods and states which is saved in mutation variable
  const mutation = useMutation({
    mutationFn: async () => {
      const feedbackText = feedbackTextRef.current.trim();

      // Validation: Ensure at least feedback text or rating is provided
      if (!feedbackText && rating === 0) throw new Error("Please provide feedback or a rating.");

      // Firebase function t send feedback
      await sendFeedback(userUid, feedbackText, rating)
    },

    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Feedback Sent",
        text2: "Thank you for your feedback!",
        text1Style: { fontSize: fontScale * 16, fontFamily: "Segoe_UI_Bold" },
        text2Style: { fontSize: fontScale * 12, fontFamily: "Segoe_UI_Bold" },
      });

      // Clear form
      if (inputRef?.current) inputRef.current.clear();
      feedbackTextRef.current = "";
      setRating(0);
    },

    onError: (error: any) => {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message || "Failed to send feedback.",
        text1Style: { fontSize: fontScale * 16, fontFamily: "Segoe_UI_Bold" },
        text2Style: { fontSize: fontScale * 12, fontFamily: "Segoe_UI_Bold" },
      });
    },
  });

  // A function to trigger the mutation, so that in the component we just call submitFeedback instead of mutation.mutate()
  const submitFeedback = () => mutation.mutate();

  return {
    submitFeedback,
    isPending: mutation.isPending, // So that in the component we use isPending instead of mutation.isPending
  };
};
