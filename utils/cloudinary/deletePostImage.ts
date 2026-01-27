import deleteCloudinaryImage from "@/app/apis/deleteCloudinaryImage";
import extractPublicId from "../extractPublicId";

const deletePostImageFromCloudinary = async (postPhoto: string | undefined) => {
  // Check if the post has an image
  if (postPhoto) {
    try {
      const publicId = extractPublicId(postPhoto);
      if (publicId) await deleteCloudinaryImage(publicId);
    } catch (error: any) {
      //console.error("Failed to delete old image:", error.message);
      // Don't throw here - profile update was successful
    }
  }
};

export default deletePostImageFromCloudinary;
