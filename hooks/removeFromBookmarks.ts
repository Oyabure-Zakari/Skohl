import { db } from "@/firebase/firebase.config";
import { useMutation } from "@tanstack/react-query";
import { deleteDoc, doc } from "firebase/firestore";
import { useWindowDimensions } from "react-native";
import Toast from "react-native-toast-message";

type UseRemoveFromBookmark = {
  postId: string;
};

export const useRemoveFromBookmark = ({ postId }: UseRemoveFromBookmark) => {
  // Get font scale for responsive toast text sizing
  const { fontScale } = useWindowDimensions();

  // useMutation gives us methods and states which is saved in mutation variable
  const mutation = useMutation({
    mutationFn: async () => {
      // Delete bookmark from firestore
      await deleteDoc(doc(db, "bookmarks", postId));
    },

    // Success callback runs after mutation is successful
    onSuccess: () => {
      // Show success toast
      Toast.show({
        type: "success",
        text1: "Bookmark",
        text2: "Post remove from your bookmarks",
        text1Style: { fontSize: fontScale * 16, fontFamily: "Segoe_UI_Bold" },
        text2Style: { fontSize: fontScale * 12, fontFamily: "Segoe_UI_Bold" },
      });
    },

    // Error callback runs after mutation fails
    onError: (error: any) => {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message || "Failed to remove bookmark",
        text1Style: { fontSize: fontScale * 16, fontFamily: "Segoe_UI_Bold" },
        text2Style: { fontSize: fontScale * 12, fontFamily: "Segoe_UI_Bold" },
      });
    },
  });

  // A function to trigger the mutation, so that in the component we just call removeFromBookmarks instead of mutation.mutate()
  const removeFromBookmarks = () => mutation.mutate();

  return {
    removeFromBookmarks,
    isRemovingFromBookmarks: mutation.isPending, // So that in the component we use isRemovingFromBookmarks instead of mutation.isPending
  };
};
