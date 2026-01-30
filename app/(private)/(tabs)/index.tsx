import React, { useCallback, useMemo, useRef, useState } from "react";
import { Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import BottomSheet from "@gorhom/bottom-sheet";

import BottomSheetComponent from "@/components/bottomSheet/BottomSheetComponent";
import FloatingActionButton from "@/components/reuseableComponents/FloatingActionButton";

import gestureHandlerRootViewStyle from "@/styles/gestureHandlerRootView.styles";

export default function HomeScreen() {
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
      <Text>Home Screen</Text>

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
