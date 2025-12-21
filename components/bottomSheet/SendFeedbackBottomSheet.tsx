import React, { useRef, useState } from "react";

import { Text, TouchableOpacity, View } from "react-native";

import StarRating from "react-native-star-rating-widget";

import { BottomSheetTextInput, BottomSheetView } from "@gorhom/bottom-sheet";

import { useAuth } from "@/contexts/AuthContext";

import COLORS from "@/constants/colors";

import CustomButton from "@/components/reuseableComponents/CustomButton";
import OverlayLoadingIndicator from "../reuseableComponents/OverlayLoadingIndicator";

import useReuseableStyles from "@/styles/reuable.styles";
import useSendFeedBottomSheetStyles from "@/styles/sendFeedBottomSheetStyles";

import { useSubmitFeedback } from "@/hooks/submitFeedback";

const SendFeedbackBottomSheet: React.FC = () => {
  const [rating, setRating] = useState(0);

  const feedbackTextRef = useRef("");
  const bottomSheetTextInputRef = useRef<any>(null);

  // Styles
  const reusableStyles = useReuseableStyles();
  const styles = useSendFeedBottomSheetStyles();

  // Current user uid from auth context
  const { userUid } = useAuth();

  // Mutation hook to submit feedback
  const { submitFeedback, isPending: isLoading } = useSubmitFeedback({
    userUid: userUid!,
    feedbackTextRef,
    rating,
    setRating,
    inputRef: bottomSheetTextInputRef,
  });

  return (
    <BottomSheetView style={styles.content}>
      {isLoading ? (
        <OverlayLoadingIndicator />
      ) : (
        <>
          <Text style={reusableStyles.bottomSheetTitle}>Send Feedback</Text>
          <View style={reusableStyles.bottomSheetDivider} />
          <Text style={reusableStyles.bottomSheetSubTitle}>{"We'd love your feedback!"}</Text>

          <BottomSheetTextInput
            ref={bottomSheetTextInputRef}
            placeholder="Feedback"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            placeholderTextColor={COLORS.darkGrey}
            style={styles.input}
            onChangeText={(text) => (feedbackTextRef.current = text)}
          />

          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>Rate us</Text>
            <StarRating
              step="full"
              rating={rating}
              onChange={setRating}
              starSize={30}
              color={COLORS.yellow}
              emptyColor={COLORS.yellow}
            />
          </View>

          <TouchableOpacity onPress={submitFeedback} disabled={isLoading}>
            <CustomButton text="Send Feedback" />
          </TouchableOpacity>
        </>
      )}
    </BottomSheetView>
  );
};

export default SendFeedbackBottomSheet;
