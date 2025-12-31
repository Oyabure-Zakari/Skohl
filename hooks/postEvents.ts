import { useAuth } from "@/contexts/AuthContext";
import postEventLogic from "@/firebase/posts/postEventLogic";
import usePhotoStore from "@/store/photoStore";
import isEventFormValid from "@/utils/postsFormValidation/eventForm";
import { useMutation } from "@tanstack/react-query";
import { useWindowDimensions } from "react-native";
import Toast from "react-native-toast-message";

type UsePostEventParams = {
  inputRef: React.RefObject<any>;
  eventTopicRef: React.RefObject<string>;
  eventVenueRef: React.RefObject<string>;
  timeRef: React.RefObject<string>;
  dateRef: React.RefObject<string>;
  eventDescriptionRef: React.RefObject<string>;
  selectedEventType: string;
  selectedEventCategory: string;
  setSelectedEventType: React.Dispatch<React.SetStateAction<string>>;
  setSelectedEventCategory: React.Dispatch<React.SetStateAction<string>>;
  photo?: string;
};

export const usePostEvent = ({
  inputRef,
  eventTopicRef,
  eventVenueRef,
  timeRef,
  dateRef,
  eventDescriptionRef,
  selectedEventType,
  selectedEventCategory,
  setSelectedEventType,
  setSelectedEventCategory,
  photo,
}: UsePostEventParams) => {
  // Get font scale for responsive toast text sizing
  const { fontScale } = useWindowDimensions();

  // Get user UID
  const { userUid } = useAuth();

  // Photo store zustand hooks
  const clearImage = usePhotoStore((state) => state.clearImage);

  // useMutation gives us methods and states which is saved in mutation variable
  const mutation = useMutation({
    mutationFn: async () => {
      try {
        // Validate form inputs
        isEventFormValid(
          eventTopicRef,
          eventVenueRef,
          timeRef,
          dateRef,
          eventDescriptionRef,
          selectedEventType,
          selectedEventCategory
        );

        // Call function to post product
        await postEventLogic({
          userUid,
          eventTopicRef,
          eventVenueRef,
          timeRef,
          dateRef,
          eventDescriptionRef,
          selectedEventType,
          selectedEventCategory,
          photo,
        });
      } catch (error: any) {
        throw new Error(error.message);
      }
    },

    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Post Sent",
        text2: "Event posted successfully!",
        text1Style: { fontSize: fontScale * 16, fontFamily: "Segoe_UI_Bold" },
        text2Style: { fontSize: fontScale * 12, fontFamily: "Segoe_UI_Bold" },
      });

      // Clear form
      if (inputRef?.current) inputRef.current.clear();
      eventTopicRef.current = "";
      eventVenueRef.current = "";
      timeRef.current = "";
      dateRef.current = "";
      eventDescriptionRef.current = "";
      setSelectedEventType("none");
      setSelectedEventCategory("none");
      clearImage();
    },

    onError: (error: any) => {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message || "Failed to post event.",
        text1Style: { fontSize: fontScale * 16, fontFamily: "Segoe_UI_Bold" },
        text2Style: { fontSize: fontScale * 12, fontFamily: "Segoe_UI_Bold" },
      });
    },
  });

  // A function to trigger the mutation, so that in the component we just call postEvent instead of mutation.mutate()
  const postEvent = () => mutation.mutate();

  return {
    postEvent,
    isPending: mutation.isPending, // So that in the component we use isPending instead of mutation.isPending
  };
};
