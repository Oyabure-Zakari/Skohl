import { useRef, useState } from "react";

import CreatePostBottomSheet from "./CreatePostBottomSheet";
import SendFeedbackBottomSheet from "./SendFeedbackBottomSheet";

import BottomSheetComponentProps from "@/types/BottomSheetProps";

import useExpoImagePicker from "@/hooks/expoImagePicker";

const BottomSheetComponent: React.FC<BottomSheetComponentProps> = ({
  activeBottomSheet,
  sheetRef,
  snapPoints,
}) => {
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");
  const [postType, setPostType] = useState<"Post a Product" | "Post a Service" | "Post an Event">(
    "Post a Product"
  );

  const { image: photo, pickImage } = useExpoImagePicker();

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

  return activeBottomSheet === "Create Post" ? (
    <CreatePostBottomSheet
      sheetRef={sheetRef}
      snapPoints={snapPoints}
      activeBottomSheet={activeBottomSheet}
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
    />
  ) : (
    <SendFeedbackBottomSheet
      sheetRef={sheetRef}
      snapPoints={snapPoints}
      activeBottomSheet="Send Feedback"
      rating={rating}
      setRating={setRating}
      feedbackTextRef={feedbackTextRef}
      handleSendFeedback={handleSendFeedback}
    />
  );
};

export default BottomSheetComponent;
