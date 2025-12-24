// React
import React, { useRef, useState } from "react";
// React Native
import { TouchableOpacity, View } from "react-native";
// Components
import CustomButton from "@/components/reuseableComponents/CustomButton";
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

const PostProductForm: React.FC = () => {
  // Refs for form values
  const productNameRef = useRef("");
  const productPriceRef = useRef("");
  const productDescriptionRef = useRef("");
  // States
  const [error, setError] = useState("");
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [selectedProductCategory, setSelectedProductCategory] = useState("");

  // Styles
  const createPostStyles = useCreatePostBottomSheetStyles();

  // Zustand
  const photo = usePhotoStore((state) => state.image);

  const isProductFormValid = () => {
    if (!photo) {
      setError("Please add a photo");
      return false;
    }
    if (
      !productNameRef.current.trim() ||
      !productPriceRef.current.trim() ||
      !productDescriptionRef.current.trim() ||
      !selectedProductCategory
    ) {
      setError("All fields are required");
      return false;
    }

    setError("");
    return true;
  };

  const handlePostProduct = () => {
    if (isProductFormValid()) {
      console.log("Product posted!");
      // After posting either failed or successful, reset, photo, and form fields
    }
  };

  if (isCameraOpen) {
    return <DeviceCamera setIsCameraOpen={setIsCameraOpen} />;
  }

  return (
    <>
      {/* Photo Section */}
      <PhotoSection
        photoText={"Product Photo"}
        photo={photo}
        openCamera={() => setIsCameraOpen(true)}
      />

      {/* Form Section */}
      <View style={createPostStyles.formContainer}>
        <BottomSheetTextInput
          placeholder="Post Name"
          onChangeText={(text) => {
            productNameRef.current = text;
            if (error) setError("");
          }}
          style={createPostStyles.input}
          placeholderTextColor={COLORS.darkGrey}
        />

        <BottomSheetTextInput
          placeholder="Price"
          keyboardType="numeric"
          onChangeText={(text) => {
            productPriceRef.current = text;
            if (error) setError("");
          }}
          style={createPostStyles.input}
          placeholderTextColor={COLORS.darkGrey}
        />

        <BottomSheetTextInput
          placeholder="Description"
          onChangeText={(text) => {
            productDescriptionRef.current = text;
            if (error) setError("");
          }}
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
