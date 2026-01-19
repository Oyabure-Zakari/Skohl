// React
import React, { useEffect, useRef, useState } from "react";
// React Native
import { TouchableOpacity, View } from "react-native";
// Packages
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
// Components
import CustomButton from "@/components/reuseableComponents/CustomButton";
import OverlayLoadingIndicator from "@/components/reuseableComponents/OverlayLoadingIndicator";
import DeviceCamera from "../../reuseableComponents/DeviceCamera";
import ServiceCategoryPicker from "../ServiceCategoryPicker";
import PhotoSection from "./ImageSection";
// Constants
import COLORS from "@/constants/colors";
// Custom Hooks
import { usePostService } from "@/hooks/postService";
// Zustand
import usePhotoStore from "@/store/photoStore";
// Styles
import useCreatePostBottomSheetStyles from "@/styles/createPostBottomSheetStyles";

type PostServiceFormProps = {
  postType: "Post a Product" | "Post a Service" | "Post an Event";
};

const PostServiceForm: React.FC<PostServiceFormProps> = ({ postType }) => {
  // Refs
  const inputRef = useRef<any>(null);
  const jobTitleRef = useRef("");
  const servicePriceRef = useRef("");
  const serviceScheduleRef = useRef("");
  const serviceDescriptionRef = useRef("");

  // States
  const [isCameraOpen, setIsCameraOpen] = useState(false);
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

  // Mutation hook to post service
  const { postService: handlePostService, isPending: isLoading } = usePostService({
    inputRef,
    jobTitleRef,
    servicePriceRef,
    serviceScheduleRef,
    serviceDescriptionRef,
    selectedServiceCategory,
    setSelectedServiceCategory,
    photo,
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
          placeholder="Job Title"
          onChangeText={(text) => (jobTitleRef.current = text)}
          style={createPostStyles.input}
          placeholderTextColor={COLORS.darkGrey}
        />

        <BottomSheetTextInput
          ref={inputRef}
          placeholder="Price"
          keyboardType="numeric"
          onChangeText={(text) => (servicePriceRef.current = text)}
          style={createPostStyles.input}
          placeholderTextColor={COLORS.darkGrey}
        />

        <BottomSheetTextInput
          ref={inputRef}
          placeholder="Schedule"
          onChangeText={(text) => (serviceScheduleRef.current = text)}
          style={createPostStyles.input}
          placeholderTextColor={COLORS.darkGrey}
        />

        <BottomSheetTextInput
          ref={inputRef}
          placeholder="Description"
          onChangeText={(text) => (serviceDescriptionRef.current = text)}
          style={createPostStyles.input}
          placeholderTextColor={COLORS.darkGrey}
          multiline={true}
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
