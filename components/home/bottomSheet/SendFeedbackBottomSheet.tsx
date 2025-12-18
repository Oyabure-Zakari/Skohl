import CustomButton from "@/components/reuseableComponents/CustomButton";
import COLORS from "@/constants/colors";
import BottomSheet, { BottomSheetTextInput, BottomSheetView } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import StarRating from "react-native-star-rating-widget";

type SendFeedbackBottomSheetProps = {
  sheetRef: React.RefObject<BottomSheetMethods | null>;
  snapPoints: string[];
  activeBottomSheet: "Send Feedback";
  rating: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
};

const SendFeedbackBottomSheet: React.FC<SendFeedbackBottomSheetProps> = ({
  sheetRef,
  snapPoints,
  activeBottomSheet,
  rating,
  setRating,
}) => {
  return (
    <BottomSheet
      ref={sheetRef}
      snapPoints={snapPoints}
      enableDynamicSizing={false}
      backgroundStyle={styles.bottomSheetStyle}
      keyboardBehavior="fillParent"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
    >
      <BottomSheetView style={styles.bottomSheetViewContent}>
        {/* Action type */}
        <Text style={styles.activeBottomSheetText}>{activeBottomSheet}</Text>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Want to give us feedback? Text */}
        <Text style={styles.activeBottomSheetText2}>{"We'd love your feedback!"}</Text>

        {/* Text Input */}
        <BottomSheetTextInput
          placeholder="Feedback"
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
          placeholderTextColor={COLORS.darkGrey}
          style={styles.postTextInput2}
        />

        {/* Rating */}
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>Rate us</Text>
          <StarRating
            maxStars={5}
            starSize={30}
            step={"full"}
            rating={rating}
            onChange={setRating}
            color={COLORS.yellow}
            emptyColor={COLORS.yellow}
          />
        </View>

        <TouchableOpacity>
          <CustomButton text={"Send Feedback"} />
        </TouchableOpacity>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  // Styles for both Create Post and Send Feedback
  bottomSheetStyle: {
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
  },

  divider: {
    width: "100%",
    height: 2,
    backgroundColor: COLORS.lightGrey,
    marginTop: 20,
  },

  // Styles for Send Feedback
  bottomSheetViewContent: {
    flex: 1,
    alignItems: "center",
  },

  activeBottomSheetText: {
    color: COLORS.darkGrey,
    fontFamily: "Segoe_UI_Bold",
  },

  activeBottomSheetText2: {
    color: COLORS.darkBlue,
    fontFamily: "Segoe_UI_Bold",
    fontSize: 16,
    marginTop: 10,
  },

  postTextInput2: {
    width: "90%",
    color: COLORS.darkGrey,
    fontFamily: "Segoe_UI_Bold",
    backgroundColor: COLORS.lightGrey,
    borderRadius: 10,
    paddingHorizontal: 16,
    marginVertical: 10,
  },

  ratingContainer: {
    gap: 10,
    alignItems: "center",
    paddingVertical: 20,
  },

  ratingText: {
    color: COLORS.darkGrey,
    fontFamily: "Segoe_UI_Bold",
  },
});

export default SendFeedbackBottomSheet;
