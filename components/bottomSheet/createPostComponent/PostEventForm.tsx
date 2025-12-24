import CustomButton from "@/components/reuseableComponents/CustomButton";
import COLORS from "@/constants/colors";
import usePhotoStore from "@/store/photoStore";
import useCreatePostBottomSheetStyles from "@/styles/createPostBottomSheetStyles";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import React, { useRef, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import EventCategoryPicker from "../EventCategoryPicker";
import EventTypePicker from "../EventTypePicker";
import DeviceCamera from "./Camera";
import PhotoSection from "./ImageSection";

const PostEventForm = () => {
  // Refs
  const eventTopicRef = useRef("");
  const eventVenueRef = useRef("");
  const eventDescriptionRef = useRef("");
  // States
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [error, setError] = useState("");
  const [selectedEventType, setSelectedEventType] = useState("");
  const [selectedEventCategory, setSelectedEventCategory] = useState("");

  // Styles
  const createPostStyles = useCreatePostBottomSheetStyles();

  // Zustand
  const photo = usePhotoStore((state) => state.image);

  const isEventFormValid = () => {
    if (!photo) {
      setError("Please add a photo");
      return false;
    }
    if (
      !eventTopicRef.current.trim() ||
      !eventVenueRef.current.trim() ||
      !eventDescriptionRef.current.trim() ||
      !selectedEventCategory ||
      !selectedEventType
    ) {
      setError("All fields are required");
      return false;
    }

    setError("");
    return true;
  };

  const handlePostEvent = () => {
    if (isEventFormValid()) {
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
          placeholder="Event Topic"
          onChangeText={(text) => {
            eventTopicRef.current = text;
            if (error) setError("");
          }}
          style={createPostStyles.input}
          placeholderTextColor={COLORS.darkGrey}
        />

        <BottomSheetTextInput
          placeholder="Venue"
          onChangeText={(text) => {
            eventVenueRef.current = text;
            if (error) setError("");
          }}
          style={createPostStyles.input}
          placeholderTextColor={COLORS.darkGrey}
        />

        <BottomSheetTextInput
          placeholder="Description"
          onChangeText={(text) => {
            eventDescriptionRef.current = text;
            if (error) setError("");
          }}
          style={createPostStyles.input}
          placeholderTextColor={COLORS.darkGrey}
        />

        <EventTypePicker
          selectedEventType={selectedEventType}
          setSelectedEventType={setSelectedEventType}
        />

        <EventCategoryPicker
          selectedCategory={selectedEventCategory}
          setSelectedCategory={setSelectedEventCategory}
        />
      </View>

      {/* Post Button Section */}
      <TouchableOpacity onPress={handlePostEvent}>
        <CustomButton text="Post" />
      </TouchableOpacity>
    </>
  );
};

export default PostEventForm;
