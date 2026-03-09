import { useAuth } from "@/contexts/AuthContext";
import postProductLogic from "@/firebase/posts/postProductLogic";
import usePhotoStore from "@/store/photoStore";
import isProductFormValid from "@/utils/postsFormValidation/productForm";
import { useMutation } from "@tanstack/react-query";
import * as Haptics from "expo-haptics";
import { useWindowDimensions } from "react-native";
import Toast from "react-native-toast-message";

type UsePostProductParams = {
  inputRef: React.RefObject<any>;
  photo: string;
  productNameRef: React.RefObject<string>;
  productPriceRef: React.RefObject<string>;
  productDescriptionRef: React.RefObject<string>;
  selectedProductCategory: string;
  setSelectedProductCategory: React.Dispatch<React.SetStateAction<string>>;
};

export const usePostProduct = ({
  inputRef,
  photo,
  productNameRef,
  productPriceRef,
  productDescriptionRef,
  selectedProductCategory,
  setSelectedProductCategory,
}: UsePostProductParams) => {
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
        isProductFormValid(
          photo,
          productNameRef.current,
          productPriceRef.current,
          productDescriptionRef.current,
          selectedProductCategory,
        );

        // Call function to post product
        await postProductLogic({
          userUid,
          photo,
          productNameRef,
          productPriceRef,
          productDescriptionRef,
          selectedProductCategory,
        });
      } catch (error: any) {
        throw new Error(error.message);
      }
    },

    onSuccess: () => {
      // Success haptic: short confirmation vibration
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      Toast.show({
        type: "success",
        text1: "Post Sent",
        text2: "Product posted successfully!",
        text1Style: { fontSize: fontScale * 16, fontFamily: "Segoe_UI_Bold" },
        text2Style: { fontSize: fontScale * 12, fontFamily: "Segoe_UI_Bold" },
      });

      // Clear form
      if (inputRef?.current) inputRef.current.clear();
      productNameRef.current = "";
      productPriceRef.current = "";
      productDescriptionRef.current = "";
      setSelectedProductCategory("none");
      clearImage();
    },

    onError: (error: any) => {
      // Error haptic: error vibration
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message || "Failed to post product.",
        text1Style: { fontSize: fontScale * 16, fontFamily: "Segoe_UI_Bold" },
        text2Style: { fontSize: fontScale * 12, fontFamily: "Segoe_UI_Bold" },
      });
    },
  });

  // A function to trigger the mutation, so that in the component we just call postProduct instead of mutation.mutate()
  const postProduct = () => mutation.mutate();

  return {
    postProduct,
    isPending: mutation.isPending, // So that in the component we use isPending instead of mutation.isPending
  };
};
