import React, { useCallback, useMemo, useRef, useState } from "react";
import { Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import BottomSheet from "@gorhom/bottom-sheet";

import BottomSheetComponent from "@/components/bottomSheet/BottomSheetComponent";
import FloatingActionButton from "@/components/reuseableComponents/FloatingActionButton";

import styles from "@/styles/gestureHandlerRootView.styles";

export default function ProductsScreen() {
  const [activeBottomSheet, setActiveBottomSheet] = useState<"Create Post" | "Send Feedback">(
    "Create Post"
  );

  const snapPoints = useMemo(() => ["8%", "50%", "100%"], []);

  const sheetRef = useRef<BottomSheet>(null);

  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  return (
    <GestureHandlerRootView style={styles.gestureHandlerRootViewContainer}>
      <Text>Home Screen</Text>
      <BottomSheetComponent
        activeBottomSheet={activeBottomSheet}
        sheetRef={sheetRef}
        snapPoints={snapPoints}
      />

      <FloatingActionButton
        setActiveBottomSheet={setActiveBottomSheet}
        handleSnapPress={handleSnapPress}
      />
    </GestureHandlerRootView>
  );
}
