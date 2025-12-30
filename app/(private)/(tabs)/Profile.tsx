import BottomSheetComponent from "@/components/bottomSheet/BottomSheetComponent";
import CustomButton from "@/components/reuseableComponents/CustomButton";
import FloatingActionButton from "@/components/reuseableComponents/FloatingActionButton";
import COLORS from "@/constants/colors";
import { auth } from "@/firebase/firebase.config";
import useVerificationStore from "@/store/verificatonStore";
import gestureHandlerRootViewStyle from "@/styles/gestureHandlerRootView.styles";
import BottomSheet from "@gorhom/bottom-sheet";
import { signOut } from "firebase/auth";
import { useCallback, useMemo, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function ProfileScreen() {
  // States
  const [activeBottomSheet, setActiveBottomSheet] = useState<"Create Post" | "Send Feedback">(
    "Create Post"
  );

  // Refs
  const sheetRef = useRef<BottomSheet>(null);

  const clearToken = useVerificationStore((state) => state.clearVerificationToken);
  const handleLogOut = async () => {
    try {
      await clearToken();
      await signOut(auth);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const snapPoints = useMemo(() => ["1%", "50%", "100%"], []);

  const handleSnapPress = useCallback(() => {
    sheetRef.current?.snapToIndex(2);
  }, []);

  return (
    <GestureHandlerRootView style={gestureHandlerRootViewStyle.container}>
      <Text>Profile Screen</Text>
      <TouchableOpacity onPress={handleLogOut}>
        <CustomButton text={"Log Out"} />
      </TouchableOpacity>

      <BottomSheetComponent
        sheetRef={sheetRef}
        snapPoints={snapPoints}
        activeBottomSheet={activeBottomSheet}
      />

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
