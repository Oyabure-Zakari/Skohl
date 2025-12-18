import React, { useCallback, useMemo, useRef, useState } from "react";
import { Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import BottomSheet from "@gorhom/bottom-sheet";

import COLORS from "@/constants/colors";

import BottomSheetComponent from "@/components/home/bottomSheet/BottomSheetComponent";
import FloatingActionButton from "@/components/reuseableComponents/FloatingActionButton";
import useExpoImagePicker from "@/hooks/expoImagePicker";

export default function ProductsScreen() {
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");
  const [activeBottomSheet, setActiveBottomSheet] = useState<"Create Post" | "Send Feedback">(
    "Create Post"
  );
  const [postType, setPostType] = useState<"Post a Product" | "Post a Service" | "Post an Event">(
    "Post a Product"
  );

  const { image: photo, pickImage } = useExpoImagePicker();

  const snapPoints = useMemo(() => ["8%", "50%", "100%"], []);

  const sheetRef = useRef<BottomSheet>(null);

  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  // Feedback
  const feedbackTextRef = useRef("");
  const handleSendFeedback = () => {
    console.log("Feedback sent");
    console.log(rating);
    console.log(feedbackTextRef.current);
  };

  // Products
  const productNameRef = useRef("");
  const productPriceRef = useRef("");
  const productDescriptionRef = useRef("");
  const [selectedProductCategory, setSelectedProductCategory] = useState("");

  const isProductFormValid = () => {
    if (!photo) {
      setError("Photo is required");
      return false;
    }
    if (
      !productNameRef.current ||
      !productPriceRef.current ||
      !productDescriptionRef.current ||
      !selectedProductCategory
    ) {
      setError("All fields are required");
      return false;
    }

    setError("");
    return true;
  };

  const handleCreateProductPost = () => {
    if (!isProductFormValid()) {
      return;
    }
    console.log("Product post created");
    console.log(productNameRef.current);
    console.log(productPriceRef.current);
    console.log(productDescriptionRef.current);
    console.log(selectedProductCategory);
  };

  // Services
  const jobTitleRef = useRef("");
  const servicePriceRef = useRef("");
  const serviceScheduleRef = useRef("");
  const serviceDescriptionRef = useRef("");
  const [selectedServiceCategory, setSelectedServiceCategory] = useState("");

  const isServiceFormValid = () => {
    if (!photo) {
      setError("Photo is required");
      return false;
    }
    if (
      !jobTitleRef.current ||
      !servicePriceRef.current ||
      !serviceScheduleRef.current ||
      !serviceDescriptionRef.current ||
      !selectedServiceCategory
    ) {
      setError("All fields are required");
      return false;
    }
    setError("");
    return true;
  };

  const handleCreateServicePost = () => {
    if (!isServiceFormValid()) {
      return;
    }
    console.log("Service post created");
  };

  // Events
  const eventTopicRef = useRef("");
  const eventVenueRef = useRef("");
  const eventDescriptionRef = useRef("");
  const [selectedEventCategory, setSelectedEventCategory] = useState("");
  const [selectedEventType, setSelectedEventType] = useState("");

  const isEventFormValid = () => {
    if (!photo) {
      setError("Photo is required");
      return false;
    }
    if (
      !eventTopicRef.current ||
      !eventVenueRef.current ||
      !eventDescriptionRef.current ||
      !selectedEventCategory ||
      !selectedEventType
    ) {
      setError("All fields are required");
      return false;
    }
    setError("");
    return true;
  };
  const handleCreateEventPost = () => {
    if (!isEventFormValid()) {
      return;
    }
    console.log("Event post created");
  };

  const handlePost = () => {
    if (postType === "Post a Product") {
      handleCreateProductPost();
    } else if (postType === "Post a Service") {
      handleCreateServicePost();
    } else if (postType === "Post an Event") {
      handleCreateEventPost();
    } else {
      console.log("Invalid post type");
    }
  };

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Home Screen</Text>
      <BottomSheetComponent
        sheetRef={sheetRef}
        snapPoints={snapPoints}
        activeBottomSheet={activeBottomSheet}
        // Post props
        postType={postType}
        setPostType={setPostType}
        photo={photo}
        pickImage={pickImage}
        error={error}
        productNameRef={productNameRef}
        productPriceRef={productPriceRef}
        productDescriptionRef={productDescriptionRef}
        selectedProductCategory={selectedProductCategory}
        setSelectedProductCategory={setSelectedProductCategory}
        jobTitleRef={jobTitleRef}
        servicePriceRef={servicePriceRef}
        serviceScheduleRef={serviceScheduleRef}
        serviceDescriptionRef={serviceDescriptionRef}
        selectedServiceCategory={selectedServiceCategory}
        setSelectedServiceCategory={setSelectedServiceCategory}
        eventTopicRef={eventTopicRef}
        eventVenueRef={eventVenueRef}
        eventDescriptionRef={eventDescriptionRef}
        selectedEventCategory={selectedEventCategory}
        setSelectedEventCategory={setSelectedEventCategory}
        selectedEventType={selectedEventType}
        setSelectedEventType={setSelectedEventType}
        handlePost={handlePost}
        // Feedback props
        rating={rating}
        setRating={setRating}
        feedbackTextRef={feedbackTextRef}
        handleSendFeedback={handleSendFeedback}
      />

      <FloatingActionButton
        setActiveBottomSheet={setActiveBottomSheet}
        handleSnapPress={handleSnapPress}
      />
    </GestureHandlerRootView>
  );
}
