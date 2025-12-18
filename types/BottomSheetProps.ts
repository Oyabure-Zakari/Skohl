import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

type BottomSheetComponentProps = {
  activeBottomSheet: "Create Post" | "Send Feedback";
  sheetRef: React.RefObject<BottomSheetMethods | null>;
  snapPoints: string[]
};

export default BottomSheetComponentProps;