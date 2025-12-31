// React
import React, { useEffect, useRef, useState } from "react";
// React Native
import { TouchableOpacity, View } from "react-native";
// Packages
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
// Components
import CustomButton from "@/components/reuseableComponents/CustomButton";
import OverlayLoadingIndicator from "@/components/reuseableComponents/OverlayLoadingIndicator";
import EventCategoryPicker from "../EventCategoryPicker";
import EventTypePicker from "../EventTypePicker";
import DeviceCamera from "./Camera";
import PhotoSection from "./ImageSection";
// Constants
import COLORS from "@/constants/colors";
// Custom Hooks
import { usePostEvent } from "@/hooks/postEvents";
// Zustand
import usePhotoStore from "@/store/photoStore";
// Styles
import useCreatePostBottomSheetStyles from "@/styles/createPostBottomSheetStyles";

type PostEventFormProps = {
  postType: "Post a Product" | "Post a Service" | "Post an Event";
};

const PostEventForm: React.FC<PostEventFormProps> = ({ postType }) => {
  // Refs
  const inputRef = useRef<any>(null);
  const eventTopicRef = useRef("");
  const eventVenueRef = useRef("");
  const timeRef = useRef("");
  const dateRef = useRef("");
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
  const clearPhoto = usePhotoStore((state) => state.clearImage);

  // UseEffect to clear image
  useEffect(() => {
    clearPhoto();
  }, [postType]);

  // Mutation hook to post event
  const { postEvent: handlePostEvent, isPending: isLoading } = usePostEvent({
    inputRef,
    eventTopicRef,
    eventVenueRef,
    timeRef,
    dateRef,
    eventDescriptionRef,
    selectedEventType,
    selectedEventCategory,
    setSelectedEventType,
    setSelectedEventCategory,
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
          placeholder="Time"
          onChangeText={(text) => {
            timeRef.current = text;
            if (error) setError("");
          }}
          style={createPostStyles.input}
          placeholderTextColor={COLORS.darkGrey}
        />

        <BottomSheetTextInput
          placeholder="Date"
          onChangeText={(text) => {
            dateRef.current = text;
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
