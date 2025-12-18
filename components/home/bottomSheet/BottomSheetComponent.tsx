import BottomSheetComponentProps from "@/types/BottomSheetProps";
import CreatePostBottomSheet from "./CreatePostBottomSheet";
import SendFeedbackBottomSheet from "./SendFeedbackBottomSheet";

const BottomSheetComponent: React.FC<BottomSheetComponentProps> = ({
  activeBottomSheet,
  sheetRef,
  snapPoints,
  postType,
  setPostType,
  photo,
  pickImage,
  error,
  productNameRef,
  productPriceRef,
  productDescriptionRef,
  selectedProductCategory,
  setSelectedProductCategory,
  jobTitleRef,
  servicePriceRef,
  serviceScheduleRef,
  serviceDescriptionRef,
  selectedServiceCategory,
  setSelectedServiceCategory,
  eventTopicRef,
  eventVenueRef,
  eventDescriptionRef,
  selectedEventCategory,
  setSelectedEventCategory,
  selectedEventType,
  setSelectedEventType,
  handlePost,
  rating,
  setRating,
  feedbackTextRef,
  handleSendFeedback,
}) => {
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
