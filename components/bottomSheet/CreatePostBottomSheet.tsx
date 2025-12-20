import { BottomSheetScrollView, BottomSheetTextInput } from "@gorhom/bottom-sheet";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import CustomButton from "@/components/reuseableComponents/CustomButton";
import FormErrorText from "@/components/reuseableComponents/FormErrorText";
import COLORS from "@/constants/colors";
import blurhash from "@/constants/expoBlurImage";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";

import useExpoImagePicker from "@/hooks/expoImagePicker";
import EventCategoryPicker from "./EventCategoryPicker";
import EventTypePicker from "./EventTypePicker";
import ProductCategoryPicker from "./ProductCategoryPicker";
import ServiceCategoryPicker from "./ServiceCategoryPicker";

const CreatePostBottomSheet: React.FC = () => {
  const [postType, setPostType] = React.useState<
    "Post a Product" | "Post a Service" | "Post an Event"
  >("Post a Product");
  const [error, setError] = React.useState("");
  const { image: photo, pickImage } = useExpoImagePicker();

  // Refs for form values
  const productNameRef = React.useRef("");
  const productPriceRef = React.useRef("");
  const productDescriptionRef = React.useRef("");
  const [selectedProductCategory, setSelectedProductCategory] = React.useState("");

  const jobTitleRef = React.useRef("");
  const servicePriceRef = React.useRef("");
  const serviceScheduleRef = React.useRef("");
  const serviceDescriptionRef = React.useRef("");
  const [selectedServiceCategory, setSelectedServiceCategory] = React.useState("");

  const eventTopicRef = React.useRef("");
  const eventVenueRef = React.useRef("");
  const eventDescriptionRef = React.useRef("");
  const [selectedEventCategory, setSelectedEventCategory] = React.useState("");
  const [selectedEventType, setSelectedEventType] = React.useState("");

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

  const handlePost = () => {
    switch (postType) {
      case "Post a Product":
        if (isProductFormValid()) {
          console.log("Product posted!");
          // After posting either failed or successful, reset, photo, and form fields
        }
        break;

      case "Post a Service":
        if (isServiceFormValid()) {
          console.log("Service posted!");
          // After posting either failed or successful, reset, photo, and form fields
        }
        break;

      case "Post an Event":
        if (isEventFormValid()) {
          console.log("Event posted!");
          // After posting either failed or successful, reset, photo, and form fields
        }
        break;

      default:
        setError("Something went wrong");
        break;
    }
  };

  return (
    <BottomSheetScrollView
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={true}
      bounces={true}
      alwaysBounceVertical={true}
      nestedScrollEnabled={true}
      decelerationRate="fast"
      overScrollMode="always"
    >
      <Text style={styles.title}>Create Post</Text>
      <View style={styles.divider} />

      <Text style={styles.subtitle}>What would you like to post?</Text>

      <View style={styles.postTypeContainer}>
        {(["Post a Product", "Post a Service", "Post an Event"] as const).map((type) => (
          <TouchableOpacity
            key={type}
            style={[postType === type ? styles.activeButton : styles.inactiveButton]}
            onPress={() => setPostType(type)}
          >
            <Text style={[postType === type ? styles.activeText : styles.inactiveText]}>
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Photo Section */}
      {!photo ? (
        <View style={styles.photoPlaceholder}>
          <Text style={styles.photoText}>Photo</Text>
        </View>
      ) : (
        <Image
          source={{ uri: photo }}
          style={styles.postPhoto}
          placeholder={{ blurhash }}
          contentFit="contain"
          transition={1000}
        />
      )}

      <View style={styles.photoOptions}>
        <TouchableOpacity style={styles.photoOption}>
          <MaterialCommunityIcons name="camera" size={25} color={COLORS.darkGrey} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.photoOption} onPress={pickImage}>
          <Entypo name="images" size={25} color={COLORS.darkGrey} />
        </TouchableOpacity>
      </View>

      <FormErrorText error={error} />

      <View style={styles.formContainer}>
        {/* Product Fields */}
        {postType === "Post a Product" && (
          <>
            <BottomSheetTextInput
              placeholder="Post Name"
              onChangeText={(text) => {
                productNameRef.current = text;
                if (error) setError("");
              }}
              style={styles.input}
              placeholderTextColor={COLORS.darkGrey}
            />
            <BottomSheetTextInput
              placeholder="Price"
              keyboardType="numeric"
              onChangeText={(text) => {
                productPriceRef.current = text;
                if (error) setError("");
              }}
              style={styles.input}
              placeholderTextColor={COLORS.darkGrey}
            />
            <BottomSheetTextInput
              placeholder="Description"
              onChangeText={(text) => {
                productDescriptionRef.current = text;
                if (error) setError("");
              }}
              style={styles.input}
              placeholderTextColor={COLORS.darkGrey}
            />
            <ProductCategoryPicker
              selectedCategory={selectedProductCategory}
              setSelectedCategory={setSelectedProductCategory}
            />
          </>
        )}

        {/* Service Fields */}
        {postType === "Post a Service" && (
          <>
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
          </>
        )}

        {/* Event Fields */}
        {postType === "Post an Event" && (
          <>
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
          </>
        )}
      </View>

      <TouchableOpacity onPress={handlePost}>
        <CustomButton text="Post" />
      </TouchableOpacity>
    </BottomSheetScrollView>
  );
};

const styles = StyleSheet.create({
  content: { alignItems: "center", paddingBottom: 200 },
  title: { color: COLORS.darkGrey, fontFamily: "Segoe_UI_Bold" },
  divider: { width: "100%", height: 2, backgroundColor: COLORS.lightGrey, marginTop: 20 },
  subtitle: { color: COLORS.darkBlue, fontFamily: "Segoe_UI_Bold", fontSize: 16, marginTop: 10 },
  postTypeContainer: { flexDirection: "row", gap: 10, marginTop: 10 },
  activeButton: { backgroundColor: COLORS.purple, borderRadius: 5, padding: 5 },
  activeText: {
    color: COLORS.white,
    fontFamily: "Segoe_UI_Bold",
    fontSize: 12,
    paddingHorizontal: 5,
  },
  inactiveButton: { borderColor: COLORS.purple, borderWidth: 1, borderRadius: 5, padding: 5 },
  inactiveText: {
    color: COLORS.purple,
    fontFamily: "Segoe_UI_Bold",
    fontSize: 12,
    paddingHorizontal: 5,
  },
  photoPlaceholder: {
    marginTop: 20,
    width: "45%",
    height: 150,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.lightGrey,
  },
  photoText: { color: COLORS.darkGrey, fontFamily: "Segoe_UI_Bold" },
  postPhoto: { width: 150, height: 150, borderRadius: 10, marginTop: 20 },
  photoOptions: { flexDirection: "row", gap: 12, marginTop: 10 },
  photoOption: {
    backgroundColor: COLORS.lightGrey,
    width: 40,
    height: 40,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: { marginBottom: 20, width: "100%", alignItems: "center", gap: 15 },
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

export default CreatePostBottomSheet;
