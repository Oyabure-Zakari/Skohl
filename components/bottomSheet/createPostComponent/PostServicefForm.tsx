import CustomButton from "@/components/reuseableComponents/CustomButton";
import COLORS from "@/constants/colors";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import React, { useRef, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import ServiceCategoryPicker from "../ServiceCategoryPicker";

type PostServiceFormProps = {
  photo: string;
};

const PostServiceForm: React.FC<PostServiceFormProps> = ({ photo }) => {
  // Refs
  const jobTitleRef = useRef("");
  const servicePriceRef = useRef("");
  const serviceScheduleRef = useRef("");
  const serviceDescriptionRef = useRef("");
  // States
  const [error, setError] = useState("");
  const [selectedServiceCategory, setSelectedServiceCategory] = useState("");

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

  return (
    <>
      <View style={styles.formContainer}>
        <BottomSheetTextInput
          placeholder="Job Title"
          onChangeText={(text) => {
            jobTitleRef.current = text;
            if (error) setError("");
          }}
          style={styles.input}
          placeholderTextColor={COLORS.darkGrey}
        />
        <BottomSheetTextInput
          placeholder="Price"
          keyboardType="numeric"
          onChangeText={(text) => {
            servicePriceRef.current = text;
            if (error) setError("");
          }}
          style={styles.input}
          placeholderTextColor={COLORS.darkGrey}
        />
        <BottomSheetTextInput
          placeholder="Schedule"
          onChangeText={(text) => {
            serviceScheduleRef.current = text;
            if (error) setError("");
          }}
          style={styles.input}
          placeholderTextColor={COLORS.darkGrey}
        />
        <BottomSheetTextInput
          placeholder="Description"
          onChangeText={(text) => {
            serviceDescriptionRef.current = text;
            if (error) setError("");
          }}
          style={styles.input}
          placeholderTextColor={COLORS.darkGrey}
        />
        <ServiceCategoryPicker
          selectedCategory={selectedServiceCategory}
          setSelectedCategory={setSelectedServiceCategory}
        />
      </View>

      <TouchableOpacity onPress={handlePostService}>
        <CustomButton text="Post" />
      </TouchableOpacity>
    </>
  );
};

export default PostServiceForm;

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
