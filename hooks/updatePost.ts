import deleteCloudinaryImage from "@/app/apis/deleteCloudinaryImage";
import { ERRORSOUND, SUCCESSSOUND } from "@/constants/soundConfig";
import { db } from "@/firebase/firebase.config";
import { Post } from "@/types/PostTypes";
import postImageUrl from "@/utils/cloudinary/postImageUrl";
import extractPublicId from "@/utils/extractPublicId";
import { useMutation } from "@tanstack/react-query";
import * as Haptics from "expo-haptics";
import { doc, updateDoc } from "firebase/firestore";
import { useWindowDimensions } from "react-native";
import Toast from "react-native-toast-message";
import { usePlaySound } from "./playSound";

type UseUpdatePostParams = {
  EditPostId: string | string[];
  postImage: string | undefined;
  postDetails: Post;
  titleRef: React.RefObject<string | undefined>;
  descriptionRef: React.RefObject<string | undefined>;
  priceRef: React.RefObject<string | undefined>;
  serviceScheduleRef: React.RefObject<string | undefined>;
  eventVenueRef: React.RefObject<string | undefined>;
  eventTimeRef: React.RefObject<string | undefined>;
  eventDateRef: React.RefObject<string | undefined>;
  selectedEventType: string;
  selectedProductCategory: string;
  selectedServiceCategory: string;
  selectedEventCategory: string;
};

export default function useUpdatePost({
  EditPostId,
  postImage,
  postDetails,
  titleRef,
  descriptionRef,
  priceRef,
  serviceScheduleRef,
  eventVenueRef,
  eventTimeRef,
  eventDateRef,
  selectedEventType,
  selectedProductCategory,
  selectedServiceCategory,
  selectedEventCategory,
}: UseUpdatePostParams) {
  const { fontScale } = useWindowDimensions();

  const { playSound } = usePlaySound();

  const mutation = useMutation({
    mutationFn: async () => {
      // Check if user has selected a new image that is not a cloudinary image
      const hasNewImage = postImage && !postImage.includes("cloudinary");
      let uploadedImage;

      // User has selected a new image, upload to Cloudinary
      if (hasNewImage) {
        uploadedImage = await postImageUrl(postImage);
      }

      // Delete previous image from Cloudinary
      if (uploadedImage && postDetails?.photo?.includes("cloudinary")) {
        try {
          const publicId = extractPublicId(postDetails?.photo);
          if (publicId) await deleteCloudinaryImage(publicId);
        } catch (deleteError: any) {
          //console.error("Failed to delete old image:", deleteError.message);
          // Don't throw here - profile update was successful
        }
      }

      // An empty object, only fields the user actually changed will be added here and sent to Firestore
      const updatedFields: any = {};

      // Only include the new image if one was uploaded
      if (uploadedImage) updatedFields.photo = uploadedImage;

      // Shared fields across all post types
      if (titleRef.current !== postDetails?.title) updatedFields.title = titleRef?.current;
      if (descriptionRef.current !== postDetails?.description)
        updatedFields.description = descriptionRef.current;

      switch (postDetails?.postType) {
        case "product":
          if (priceRef.current !== postDetails?.price?.slice(1))
            updatedFields.price = `₦${priceRef?.current}`;
          if (selectedProductCategory !== postDetails?.category)
            updatedFields.category = selectedProductCategory;
          break;

        case "service":
          if (priceRef.current !== postDetails?.price?.slice(1))
            updatedFields.price = `₦${priceRef?.current}`;
          if (serviceScheduleRef.current !== postDetails?.serviceSchedule)
            updatedFields.serviceSchedule = serviceScheduleRef.current;
          if (selectedServiceCategory !== postDetails?.category)
            updatedFields.category = selectedServiceCategory;
          break;

        case "event":
          if (eventDateRef.current !== postDetails?.eventDate)
            updatedFields.eventDate = eventDateRef.current;
          if (eventTimeRef.current !== postDetails?.eventTime)
            updatedFields.eventTime = eventTimeRef.current;
          if (eventVenueRef.current !== postDetails?.eventVenue)
            updatedFields.eventVenue = eventVenueRef.current;
          if (selectedEventCategory !== postDetails?.category)
            updatedFields.category = selectedEventCategory;
          if (selectedEventType !== postDetails?.eventType)
            updatedFields.eventType = selectedEventType;
          break;

        default:
          // Plays error sound
          playSound(ERRORSOUND);

          // Haptic  feedback
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

          // Toast notification
          Toast.show({
            type: "error",
            text1: "Post not updated",
            text2: "An error occurred while updating the post.",
            text1Style: { fontSize: fontScale * 16, fontFamily: "Segoe_UI_Bold" },
            text2Style: { fontSize: fontScale * 12, fontFamily: "Segoe_UI_Bold" },
          });
          return;
      }

      // If the user didn't change anything, let them know, stop here and skip the Firestore write entirely
      if (Object.keys(updatedFields).length === 0) {
        // Error haptic: warning vibration
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);

        Toast.show({
          type: "info",
          text1: "Post not updated",
          text2: "You did not make any changes",
          text1Style: { fontSize: fontScale * 16, fontFamily: "Segoe_UI_Bold" },
          text2Style: { fontSize: fontScale * 12, fontFamily: "Segoe_UI_Bold" },
        });
        return;
      }

      try {
        // At this point we have confirmed changes, so update only the changed fields in Firestore
        await updateDoc(doc(db, "posts", EditPostId as string), updatedFields);

        playSound(SUCCESSSOUND);

        Toast.show({
          type: "success",
          text1: "Post updated",
          text2: "Your post has been updated successfully",
          text1Style: { fontSize: fontScale * 16, fontFamily: "Segoe_UI_Bold" },
          text2Style: { fontSize: fontScale * 12, fontFamily: "Segoe_UI_Bold" },
        });
      } catch (error: any) {
        // Plays error sound
        playSound(ERRORSOUND);

        // Haptic  feedback
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

        // Toast notification
        Toast.show({
          type: "error",
          text1: "Post not updated",
          text2: `Failed to update post: ${error.message}`,
          text1Style: { fontSize: fontScale * 16, fontFamily: "Segoe_UI_Bold" },
          text2Style: { fontSize: fontScale * 12, fontFamily: "Segoe_UI_Bold" },
        });
      }
    },
  });

  const handleUpdatePost = () => mutation.mutate();

  return {
    handleUpdatePost,
    isUpdatingPost: mutation.isPending,
    isUpdatePostError: mutation.isError,
    updatePostError: mutation.error,
  };
}
