// React
import React, { useEffect, useRef, useState } from "react";
// React Native
import { TouchableOpacity, View } from "react-native";
// Components
import CustomButton from "@/components/reuseableComponents/CustomButton";
import OverlayLoadingIndicator from "@/components/reuseableComponents/OverlayLoadingIndicator";
import ProductCategoryPicker from "../ProductCategoryPicker";
import DeviceCamera from "./Camera";
import PhotoSection from "./ImageSection";
// Connstants
import COLORS from "@/constants/colors";
// Styles
import useCreatePostBottomSheetStyles from "@/styles/createPostBottomSheetStyles";
// Packages
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
// Zustand
import usePhotoStore from "@/store/photoStore";
// Custom Hooks
import { usePostProduct } from "@/hooks/postProduct";

type PostProductFormProps = {
  postType: "Post a Product" | "Post a Service" | "Post an Event";
};

const PostProductForm: React.FC<PostProductFormProps> = ({ postType }) => {
  // Refs
  const inputRef = useRef<any>(null);
  const productNameRef = useRef("");
  const productPriceRef = useRef("");
  const productDescriptionRef = useRef("");

  // States
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [selectedProductCategory, setSelectedProductCategory] = useState("");

  // Styles
  const createPostStyles = useCreatePostBottomSheetStyles();

  // Zustand
  const photo = usePhotoStore((state) => state.image);
  const clearPhoto = usePhotoStore((state) => state.clearImage);

  // UseEffect to clear image
  useEffect(() => {
    clearPhoto();
  }, [postType]);

  // Mutation hook to post product
  const { postProduct: handlePostProduct, isPending: isLoading } = usePostProduct({
    inputRef,
    photo,
    productNameRef,
    productPriceRef,
    productDescriptionRef,
    selectedProductCategory,
    setSelectedProductCategory,
  });

  if (isCameraOpen) {
    return <DeviceCamera setIsCameraOpen={setIsCameraOpen} />;
  }

  if (isLoading) {
    return <OverlayLoadingIndicator />;
  }

  return (
    <>
      {/* Photo Section */}
      <PhotoSection photo={photo} openCamera={() => setIsCameraOpen(true)} />

      {/* Form Section */}
      <View style={createPostStyles.formContainer}>
        <BottomSheetTextInput
          ref={inputRef}
          placeholder="Product Name"
          onChangeText={(text) => (productNameRef.current = text)}
          style={createPostStyles.input}
          placeholderTextColor={COLORS.darkGrey}
        />

        <BottomSheetTextInput
          ref={inputRef}
          placeholder="Price"
          keyboardType="numeric"
          onChangeText={(text) => (productPriceRef.current = text)}
          style={createPostStyles.input}
          placeholderTextColor={COLORS.darkGrey}
        />

        <BottomSheetTextInput
          ref={inputRef}
          placeholder="Description"
          onChangeText={(text) => (productDescriptionRef.current = text)}
          style={createPostStyles.input}
          placeholderTextColor={COLORS.darkGrey}
        />

        <ProductCategoryPicker
          selectedCategory={selectedProductCategory}
          setSelectedCategory={setSelectedProductCategory}
        />
      </View>

      {/* Post Button Section */}
      <TouchableOpacity onPress={handlePostProduct}>
        <CustomButton text="Post" />
      </TouchableOpacity>
    </>
  );
};

export default PostProductForm;
