import BottomSheetComponent from "@/components/bottomSheet/BottomSheetComponent";
import FloatingActionButton from "@/components/reuseableComponents/FloatingActionButton";
import COLORS from "@/constants/colors";
import gestureHandlerRootViewStyle from "@/styles/gestureHandlerRootView.styles";
import BottomSheet from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function EventsScreen() {
  // States
  const [activeBottomSheet, setActiveBottomSheet] = useState<"Create Post" | "Send Feedback">(
    "Create Post",
  );

  // Refs
  const sheetRef = useRef<BottomSheet>(null);

  // Bottom Sheet snap points
  const snapPoints = useMemo(() => ["1%", "50%", "100%"], []);

  // Handlers
  const handleSnapPress = useCallback(() => {
    sheetRef.current?.snapToIndex(2);
  }, []);

  return (
    <GestureHandlerRootView style={gestureHandlerRootViewStyle.container}>
      <Text>Event Screen</Text>

      {/* Bottom Sheet */}
      <BottomSheetComponent
        sheetRef={sheetRef}
        snapPoints={snapPoints}
        activeBottomSheet={activeBottomSheet}
      />

      {/* Floating Action Button */}
      <FloatingActionButton
        setActiveBottomSheet={setActiveBottomSheet}
        handleSnapPress={handleSnapPress}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },
});
