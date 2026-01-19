import deleteCloudinaryImage from "@/app/apis/deleteCloudinaryImage";
import { db } from "@/firebase/firebase.config";
import UserProfileType from "@/types/userProfileTypes";
import postImageUrl from "@/utils/cloudinary/postImageUrl";
import extractPublicId from "@/utils/extractPublicId";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { doc, updateDoc } from "firebase/firestore";
import { useWindowDimensions } from "react-native";
import Toast from "react-native-toast-message";

type UseUpdateProfile = {
  user: UserProfileType;
  userImage: string;
  userBioTextRef: React.RefObject<string>;
};

export const useUpdateProfile = ({ user, userImage, userBioTextRef }: UseUpdateProfile) => {
  // Get font scale for responsive toast text sizing
  const { fontScale } = useWindowDimensions();
  
  // Get query client to invalidate queries
  const queryClient = useQueryClient();

  // useMutation gives us methods and states which is saved in mutation variable
  const mutation = useMutation({
    mutationFn: async () => {
      // Check if user has selected a new image that is not a cloudinary image
      const hasNewImage = userImage && !userImage.includes("cloudinary");
      let uploadedImage;

      // User has selected a new image, upload to Cloudinary
      if (hasNewImage) {
        uploadedImage = await postImageUrl(userImage);
      }

      // Check if user did not make any changes
      const imageChanged = hasNewImage; 
      const bioChanged = userBioTextRef.current.trim() !== user?.bio;

      // User did not make any changes
      if (!imageChanged && !bioChanged) {
        // Show toast
        Toast.show({
          type: "info",
          text1: "Profile not updated",
          text2: "You did not make any changes",
          text1Style: { fontSize: fontScale * 16, fontFamily: "Segoe_UI_Bold" },
          text2Style: { fontSize: fontScale * 12, fontFamily: "Segoe_UI_Bold" },
        });
        throw new Error("No changes made"); // Throw to prevent onSuccess from running
      }

      // Update Firestore
      await updateDoc(doc(db, "users", user?.uid), {
        bio: userBioTextRef.current.trim(),
        image: uploadedImage || user?.image, // Use new image if uploaded, otherwise keep existing
      });

      // Delete previous image from Cloudinary ONLY if a new image was uploaded
      if (uploadedImage && user?.image?.includes("cloudinary")) {
        try {
          const publicId = extractPublicId(user?.image);
          if (publicId) await deleteCloudinaryImage(publicId);

        } catch (deleteError: any) {
          // Log error but don't fail the entire operation
          console.error("Failed to delete old image:", deleteError.message);
          throw new Error("Failed to delete old image:", deleteError.message);
        }
      }
    },

    // Success callback runs after mutation is successful
    onSuccess: () => {
      // Invalidate and refetch user profile query
      queryClient.invalidateQueries({ 
        queryKey: ["user", user?.uid] 
      });

      // Show success toast
      Toast.show({
        type: "success",
        text1: "Profile updated",
        text2: "Your profile has been updated successfully",
        text1Style: { fontSize: fontScale * 16, fontFamily: "Segoe_UI_Bold" },
        text2Style: { fontSize: fontScale * 12, fontFamily: "Segoe_UI_Bold" },
      });
    },

    // Error callback runs if mutation fails
    onError: (error: any) => {
      // Don't show error toast if it's just "No changes made"
      if (error.message === "No changes made") return;

      // Show error toast
      Toast.show({
        type: "error",
        text1: "Update failed",
        text2: error.message || "Failed to update profile",
        text1Style: { fontSize: fontScale * 16, fontFamily: "Segoe_UI_Bold" },
        text2Style: { fontSize: fontScale * 12, fontFamily: "Segoe_UI_Bold" },
      });
    },
  });

  // A function to trigger the mutation, so that in the component we just call updateProfile instead of mutation.mutate()
  const updateProfile = () => mutation.mutate();

  return {
    updateProfile,
    isPending: mutation.isPending, // So that in the component we use isPending instead of mutation.isPending
  };
};