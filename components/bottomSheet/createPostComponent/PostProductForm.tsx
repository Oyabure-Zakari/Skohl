import CustomButton from "@/components/reuseableComponents/CustomButton";
import COLORS from "@/constants/colors";
import useExpoImagePicker from "@/hooks/expoImagePicker";
import useCreatePostBottomSheetStyles from "@/styles/createPostBottomSheetStyles";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import React, { useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import ProductCategoryPicker from "../ProductCategoryPicker";
import PhotoSection from "./ImageSection";

import DeviceCamera from "./Camera";

const PostProductForm: React.FC = () => {
  // Refs for form values
  const productNameRef = useRef("");
  const productPriceRef = useRef("");
  const productDescriptionRef = useRef("");
  // States
  const [error, setError] = useState("");
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [selectedProductCategory, setSelectedProductCategory] = useState("");

  // Camera
  const [cameraImage, setCameraImage] = useState<string | null>(null);

  // Styles
  const createPostStyles = useCreatePostBottomSheetStyles();

  // Custom Hooks
  const { image: photo, pickImage } = useExpoImagePicker();

  const isProductFormValid = () => {
    if (!photo || !cameraImage) {
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

  console.log("Camera Image :", cameraImage);

  if (isCameraOpen) {
    return <DeviceCamera setIsCameraOpen={setIsCameraOpen} setCameraImage={setCameraImage} />;
  }

  return (
    <>
      {/* Photo Section */}
      <PhotoSection
        photoText={"Product Photo"}
        photo={photo}
        cameraImage={cameraImage}
        pickImage={pickImage}
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
