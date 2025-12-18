import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

type SendFeedbackBottomSheetProps = {
  sheetRef: React.RefObject<BottomSheetMethods | null>;
  snapPoints: string[];
  activeBottomSheet: "Send Feedback";
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
  feedbackTextRef: React.RefObject<string>;
  handleSendFeedback: () => void;
};

export default SendFeedbackBottomSheetProps;