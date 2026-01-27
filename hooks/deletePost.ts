import { db } from "@/firebase/firebase.config";
import { Post } from "@/types/PostTypes";
import deletePostImageFromCloudinary from "@/utils/cloudinary/deletePostImage";
import { useMutation } from "@tanstack/react-query";
import { deleteDoc, doc } from "firebase/firestore";
import { useWindowDimensions } from "react-native";
import Toast from "react-native-toast-message";

type UseDeletePost = {
  post: Post;
};

export const useDeletePost = ({ post }: UseDeletePost) => {
  // Get font scale for responsive toast text sizing
  const { fontScale } = useWindowDimensions();

  // useMutation gives us methods and states which is saved in mutation variable
  const mutation = useMutation({
    mutationFn: async () => {
      // Delete post image from Cloudinary
      await deletePostImageFromCloudinary(post?.photo);

      // Delete post from firestore
      await deleteDoc(doc(db, "posts", post?.id));
    },

    // Success callback runs after mutation is successful
    onSuccess: () => {
      // Show success toast
      Toast.show({
        type: "success",
        text1: "Post deleted",
        text2: "Post deleted successfully",
        text1Style: { fontSize: fontScale * 16, fontFamily: "Segoe_UI_Bold" },
        text2Style: { fontSize: fontScale * 12, fontFamily: "Segoe_UI_Bold" },
      });
    },

    // Error callback runs after mutation fails
    onError: (error: any) => {
      Toast.show({
        type: "error",
        text1: "Post not deleted",
        text2: "Failed to delete post. Try again.",
        text1Style: { fontSize: fontScale * 16, fontFamily: "Segoe_UI_Bold" },
        text2Style: { fontSize: fontScale * 12, fontFamily: "Segoe_UI_Bold" },
      });
    },
  });

  // A function to trigger the mutation, so that in the component we just call deletePost instead of mutation.mutate()
  const deletePost = () => mutation.mutate();

  return {
    deletePost,
    isDeletingPost: mutation.isPending, // So that in the component we use isDeletingPost instead of mutation.isPending
  };
};
