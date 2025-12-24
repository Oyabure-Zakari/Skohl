import CustomButton from "@/components/reuseableComponents/CustomButton";
import COLORS from "@/constants/colors";
import usePhotoStore from "@/store/photoStore";
import useCreatePostBottomSheetStyles from "@/styles/createPostBottomSheetStyles";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import ServiceCategoryPicker from "../ServiceCategoryPicker";
import DeviceCamera from "./Camera";
import PhotoSection from "./ImageSection";

type PostServiceFormProps = {
  postType: "Post a Product" | "Post a Service" | "Post an Event";
};

const PostServiceForm: React.FC<PostServiceFormProps> = ({ postType }) => {
  // Refs
  const jobTitleRef = useRef("");
  const servicePriceRef = useRef("");
  const serviceScheduleRef = useRef("");
  const serviceDescriptionRef = useRef("");
  // States
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [error, setError] = useState("");
  const [selectedServiceCategory, setSelectedServiceCategory] = useState("");

  // Styles
  const createPostStyles = useCreatePostBottomSheetStyles();

  // Zustand
  const photo = usePhotoStore((state) => state.image);
  const clearPhoto = usePhotoStore((state) => state.clearImage);

  // UseEffect to clear image
  useEffect(() => {
    clearPhoto();
  }, [postType]);

  const isServiceFormValid = () => {
    if (!photo) {
      setError("Please add a photo");
      return false;
    }
    if (
      !jobTitleRef.current.trim() ||
      !servicePriceRef.current.trim() ||
      !serviceScheduleRef.current.trim() ||
      !serviceDescriptionRef.current.trim() ||
      !selectedServiceCategory
    ) {
      setError("All fields are required");
      return false;
    }

    setError("");
    return true;
  };

  const handlePostService = () => {
    if (isServiceFormValid()) {
      console.log("Service posted!");
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
          placeholder="Job Title"
          onChangeText={(text) => {
            jobTitleRef.current = text;
            if (error) setError("");
          }}
          style={createPostStyles.input}
          placeholderTextColor={COLORS.darkGrey}
        />

        <BottomSheetTextInput
          placeholder="Price"
          keyboardType="numeric"
          onChangeText={(text) => {
            servicePriceRef.current = text;
            if (error) setError("");
          }}
          style={createPostStyles.input}
          placeholderTextColor={COLORS.darkGrey}
        />

        <BottomSheetTextInput
          placeholder="Schedule"
          onChangeText={(text) => {
            serviceScheduleRef.current = text;
            if (error) setError("");
          }}
          style={createPostStyles.input}
          placeholderTextColor={COLORS.darkGrey}
        />

        <BottomSheetTextInput
          placeholder="Description"
          onChangeText={(text) => {
            serviceDescriptionRef.current = text;
            if (error) setError("");
          }}
          style={createPostStyles.input}
          placeholderTextColor={COLORS.darkGrey}
        />

        <ServiceCategoryPicker
          selectedCategory={selectedServiceCategory}
          setSelectedCategory={setSelectedServiceCategory}
        />
      </View>

      {/* Post Button Section */}
      <TouchableOpacity onPress={handlePostService}>
        <CustomButton text="Post" />
      </TouchableOpacity>
    </>
  );
};

export default PostServiceForm;
