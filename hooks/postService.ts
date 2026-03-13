import { ERRORSOUND, SUCCESSSOUND } from "@/constants/soundConfig";
import { useAuth } from "@/contexts/AuthContext";
import postServiceLogic from "@/firebase/posts/postServiceLogic";
import usePhotoStore from "@/store/photoStore";
import isServiceFormValid from "@/utils/postsFormValidation/serviceForm";
import { useMutation } from "@tanstack/react-query";
import * as Haptics from "expo-haptics";
import { useWindowDimensions } from "react-native";
import Toast from "react-native-toast-message";
import { usePlaySound } from "./playSound";

type UsePostServiceParams = {
  inputRef: React.RefObject<any>;
  jobTitleRef: React.RefObject<string>;
  servicePriceRef: React.RefObject<string>;
  serviceScheduleRef: React.RefObject<string>;
  serviceDescriptionRef: React.RefObject<string>;
  selectedServiceCategory: string;
  setSelectedServiceCategory: React.Dispatch<React.SetStateAction<string>>;
  photo?: string;
};

export const usePostService = ({
  inputRef,
  jobTitleRef,
  servicePriceRef,
  serviceScheduleRef,
  serviceDescriptionRef,
  selectedServiceCategory,
  setSelectedServiceCategory,
  photo,
}: UsePostServiceParams) => {
  // Get font scale for responsive toast text sizing
  const { fontScale } = useWindowDimensions();

  const { playSound } = usePlaySound();

  // Get user UID
  const { userUid } = useAuth();

  // Photo store zustand hooks
  const clearImage = usePhotoStore((state) => state.clearImage);

  // useMutation gives us methods and states which is saved in mutation variable
  const mutation = useMutation({
    mutationFn: async () => {
      try {
        // Validate form inputs
        isServiceFormValid(
          jobTitleRef,
          servicePriceRef,
          serviceScheduleRef,
          serviceDescriptionRef,
          selectedServiceCategory,
        );

        // Call function to post product
        await postServiceLogic({
          userUid,
          jobTitleRef,
          servicePriceRef,
          serviceScheduleRef,
          serviceDescriptionRef,
          selectedServiceCategory,
          photo,
        });
      } catch (error: any) {
        throw new Error(error.message);
      }
    },

    onSuccess: () => {
      playSound(SUCCESSSOUND);

      Toast.show({
        type: "success",
        text1: "Post Sent",
        text2: "Service posted successfully!",
        text1Style: { fontSize: fontScale * 16, fontFamily: "Segoe_UI_Bold" },
        text2Style: { fontSize: fontScale * 12, fontFamily: "Segoe_UI_Bold" },
      });

      // Clear form
      if (inputRef?.current) inputRef.current.clear();
      jobTitleRef.current = "";
      servicePriceRef.current = "";
      serviceScheduleRef.current = "";
      serviceDescriptionRef.current = "";
      setSelectedServiceCategory("none");
      clearImage();
    },

    onError: (error: any) => {
      // Plays error sound
      playSound(ERRORSOUND);

      // Haptic  feedback
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

      // Toast notification
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message || "Failed to post service.",
        text1Style: { fontSize: fontScale * 16, fontFamily: "Segoe_UI_Bold" },
        text2Style: { fontSize: fontScale * 12, fontFamily: "Segoe_UI_Bold" },
      });
    },
  });

  // A function to trigger the mutation, so that in the component we just call postService instead of mutation.mutate()
  const postService = () => mutation.mutate();

  return {
    postService,
    isPending: mutation.isPending, // So that in the component we use isPending instead of mutation.isPending
  };
};
