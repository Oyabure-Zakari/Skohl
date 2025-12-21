import CustomButton from "@/components/reuseableComponents/CustomButton";
import COLORS from "@/constants/colors";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import React, { useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import EventCategoryPicker from "../EventCategoryPicker";
import EventTypePicker from "../EventTypePicker";

type PostEventFormProps = {
  photo: string;
};

const PostEventForm: React.FC<PostEventFormProps> = ({ photo }) => {
  // Refs
  const eventTopicRef = useRef("");
  const eventVenueRef = useRef("");
  const eventDescriptionRef = useRef("");
  // States
  const [error, setError] = useState("");
  const [selectedEventType, setSelectedEventType] = useState("");
  const [selectedEventCategory, setSelectedEventCategory] = useState("");

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

  return (
    <>
      <View style={styles.formContainer}>
        <BottomSheetTextInput
          placeholder="Event Topic"
          onChangeText={(text) => {
            eventTopicRef.current = text;
            if (error) setError("");
          }}
          style={styles.input}
          placeholderTextColor={COLORS.darkGrey}
        />
        <BottomSheetTextInput
          placeholder="Venue"
          onChangeText={(text) => {
            eventVenueRef.current = text;
            if (error) setError("");
          }}
          style={styles.input}
          placeholderTextColor={COLORS.darkGrey}
        />
        <BottomSheetTextInput
          placeholder="Description"
          onChangeText={(text) => {
            eventDescriptionRef.current = text;
            if (error) setError("");
          }}
          style={styles.input}
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

      <TouchableOpacity onPress={handlePostEvent}>
        <CustomButton text="Post" />
      </TouchableOpacity>
    </>
  );
};

export default PostEventForm;

const styles = StyleSheet.create({
  formContainer: {
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
    gap: 15,
  },

  input: {
    width: "90%",
    backgroundColor: COLORS.lightGrey,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: COLORS.darkGrey,
    fontFamily: "Segoe_UI_Bold",
    minHeight: 48,
  },
});
