import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

type BottomSheetComponentProps = {
  sheetRef: React.RefObject<BottomSheetMethods | null>;
  snapPoints: string[];
  activeBottomSheet: "Create Post" | "Send Feedback";
  // Create Post props
  postType: "Post a Product" | "Post a Service" | "Post an Event";
  setPostType: React.Dispatch<
    React.SetStateAction<"Post a Product" | "Post a Service" | "Post an Event">
  >;
  photo: string;
  pickImage: () => Promise<void>;
  error: string;
  productNameRef: React.RefObject<string>;
  productPriceRef: React.RefObject<string>;
  productDescriptionRef: React.RefObject<string>;
  selectedProductCategory: string;
  setSelectedProductCategory: React.Dispatch<React.SetStateAction<string>>;
  jobTitleRef: React.RefObject<string>;
  servicePriceRef: React.RefObject<string>;
  serviceScheduleRef: React.RefObject<string>;
  serviceDescriptionRef: React.RefObject<string>;
  selectedServiceCategory: string;
  setSelectedServiceCategory: React.Dispatch<React.SetStateAction<string>>;
  eventTopicRef: React.RefObject<string>;
  eventVenueRef: React.RefObject<string>;
  eventDescriptionRef: React.RefObject<string>;
  selectedEventType: string;
  setSelectedEventType: React.Dispatch<React.SetStateAction<string>>;
  selectedEventCategory: string;
  setSelectedEventCategory: React.Dispatch<React.SetStateAction<string>>;
  handlePost: () => void;
  // Send Feedback props
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
  feedbackTextRef: React.RefObject<string>;
  handleSendFeedback: () => void;
};

export default BottomSheetComponentProps;