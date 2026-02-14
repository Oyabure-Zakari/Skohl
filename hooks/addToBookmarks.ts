import addBookmarks from "@/firebase/bookmarks/addBookmarks";
import { useMutation } from "@tanstack/react-query";
import { useWindowDimensions } from "react-native";
import Toast from "react-native-toast-message";

type UseAddToBookmarks = {
  postId: string;
  userUid: string | null;
};

export default function useAddToBookmarks({ postId, userUid }: UseAddToBookmarks) {
  // Get font scale for responsive toast text sizing
  const { fontScale } = useWindowDimensions();

  // useMutation gives us methods and states which is saved in mutation variable
  const mutation = useMutation({
    mutationFn: async () => {
      await addBookmarks(postId, userUid);
    },

    // Success callback runs after mutation is successful
    onSuccess: () => {
      // Show success toast
      Toast.show({
        type: "success",
        text1: "Bookmark",
        text2: "Post added to your bookmarks",
        text1Style: { fontSize: fontScale * 16, fontFamily: "Segoe_UI_Bold" },
        text2Style: { fontSize: fontScale * 12, fontFamily: "Segoe_UI_Bold" },
      });
    },

    // Error callback runs after mutation fails
    onError: (error: any) => {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message || "Failed to add bookmark",
        text1Style: { fontSize: fontScale * 16, fontFamily: "Segoe_UI_Bold" },
        text2Style: { fontSize: fontScale * 12, fontFamily: "Segoe_UI_Bold" },
      });
    },
  });

  // A function to trigger the mutation, so that in the component we just call addToBookmarks instead of mutation.mutate()
  const addToBookmarks = () => mutation.mutate();

  return {
    addToBookmarks,
    isAddingToBookmarks: mutation.isPending, // So that in the component we use isAddingToBookmarks instead of mutation.isPending
  };
}
