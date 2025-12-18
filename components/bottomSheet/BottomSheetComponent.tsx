import bottomSheeBackgroundStyle from "@/styles/bottomSheetBackGround.styles";
import BottomSheet from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import CreatePostBottomSheet from "./CreatePostBottomSheet";
import SendFeedbackBottomSheet from "./SendFeedbackBottomSheet";

type BottomSheetComponentProps = {
  sheetRef: React.RefObject<BottomSheetMethods | null>;
  snapPoints: string[];
  activeBottomSheet: "Create Post" | "Send Feedback";
};

const BottomSheetComponent: React.FC<BottomSheetComponentProps> = ({
  sheetRef,
  snapPoints,
  activeBottomSheet,
}) => {
  return (
    <BottomSheet
      ref={sheetRef}
      index={0} // Start closed
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      backgroundStyle={bottomSheeBackgroundStyle.backgroundStyle}
      keyboardBehavior="interactive"
      android_keyboardInputMode="adjustResize"
    >
      {activeBottomSheet === "Create Post" && <CreatePostBottomSheet />}
      {activeBottomSheet === "Send Feedback" && <SendFeedbackBottomSheet />}
    </BottomSheet>
  );
};

export default BottomSheetComponent;
