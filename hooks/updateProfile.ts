import deleteCloudinaryImage from "@/app/apis/deleteCloudinaryImage";
import { db } from "@/firebase/firebase.config";
import UserProfileType from "@/types/userProfileTypes";
import postImageUrl from "@/utils/cloudinary/postImageUrl";
import extractPublicId from "@/utils/extractPublicId";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { collection, doc, getDocs, query, updateDoc, where, writeBatch } from "firebase/firestore";
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
        Toast.show({
          type: "info",
          text1: "Profile not updated",
          text2: "You did not make any changes",
          text1Style: { fontSize: fontScale * 16, fontFamily: "Segoe_UI_Bold" },
          text2Style: { fontSize: fontScale * 12, fontFamily: "Segoe_UI_Bold" },
        });
        throw new Error("No changes made"); // Throw to prevent onSuccess from runnin
      }

      // Update user profile in Firestore
      await updateDoc(doc(db, "users", user?.uid), {
        bio: userBioTextRef.current.trim(),
        image: uploadedImage || user?.image,
      });

      // Update user image in all posts if image changed
      if (uploadedImage) {
        await updateUserImageInPosts(user?.uid, uploadedImage);
      }

      // Delete previous image from Cloudinary
      if (uploadedImage && user?.image?.includes("cloudinary")) {
        try {
          const publicId = extractPublicId(user?.image);
          if (publicId) await deleteCloudinaryImage(publicId);
        } catch (deleteError: any) {
          console.error("Failed to delete old image:", deleteError.message);
          // Don't throw here - profile update was successful
        }
      }
    },

    // Success callback runs after mutation is successful
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user", user?.uid],
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

// Helper function to update user image in all posts
async function updateUserImageInPosts(userId: string, newImageUrl: string) {
  try {
    // Query all posts by this user
    const q = query(collection(db, "posts"), where("postedBy.userUid", "==", userId));
    const snapshot = await getDocs(q);

    // If the user hasn't created any posts yet, exit early
    if (snapshot.empty) {
      console.log("No posts to update");
      return;
    }

    // Create a batch to group multiple updates into a single operation instead of updating each post's user image one by one
    const batch = writeBatch(db);

    snapshot.forEach((postDoc) => {
      // Queue this post for update
      batch.update(postDoc.ref, {
        "postedBy.image": newImageUrl,
      });
    });

    // Execute all batched updates at once
    await batch.commit();
    console.log(`Updated ${snapshot.size} posts with new profile image`);
  } catch (error) {
    console.error("Error updating posts:", error);
    throw new Error("Failed to update posts with new profile image");
  }
}
