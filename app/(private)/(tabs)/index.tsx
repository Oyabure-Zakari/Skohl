import FloatingActionButton from "@/components/reuseableComponents/FloatingActionButton";
import COLORS from "@/constants/colors";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function ProductsScreen() {
  const [actionType, setActionType] = useState("");

  const sheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["1%", "50%", "90%"], []);

  useEffect(() => {
    if (snapPoints[0] === "1%") {
      sheetRef.current?.forceClose();
    }
  }, [snapPoints]);

  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <Text>Products Screen</Text>
      {actionType === "Send Feedback " ? (
        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          enableDynamicSizing={false}
          backgroundStyle={{
            borderRadius: 10,
            backgroundColor: COLORS.white,
            shadowColor: COLORS.darkBlue,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 20,
          }}
        >
          <BottomSheetView
            style={{
              flex: 1,
              alignItems: "center",
            }}
          >
            <Text>{actionType}</Text>
          </BottomSheetView>
        </BottomSheet>
      ) : (
        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          enableDynamicSizing={false}
          backgroundStyle={{
            borderRadius: 10,
            backgroundColor: COLORS.white,
            shadowColor: COLORS.darkBlue,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 20,
          }}
        >
          <BottomSheetView
            style={{
              flex: 1,
              alignItems: "center",
            }}
          >
            <Text>{actionType}</Text>
          </BottomSheetView>
        </BottomSheet>
      )}

      <FloatingActionButton setActionType={setActionType} handleSnapPress={handleSnapPress} />
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
