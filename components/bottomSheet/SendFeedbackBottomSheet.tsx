// React
import React, { useRef, useState } from "react";
// React Native
import { Text, TouchableOpacity, View } from "react-native";
// Packages
import { BottomSheetScrollView, BottomSheetTextInput } from "@gorhom/bottom-sheet";
import StarRating from "react-native-star-rating-widget";
// Context
import { useAuth } from "@/contexts/AuthContext";
// Constants
import COLORS from "@/constants/colors";
// Components
import CustomButton from "@/components/reuseableComponents/CustomButton";
import OverlayLoadingIndicator from "../reuseableComponents/OverlayLoadingIndicator";
// Styles
import useReuseableStyles from "@/styles/reuable.styles";
import useSendFeedBottomSheetStyles from "@/styles/sendFeedBottomSheetStyles";
// Hook
import { useSubmitFeedback } from "@/hooks/submitFeedback";
import useCreatePostBottomSheetStyles from "@/styles/createPostBottomSheetStyles";

const SendFeedbackBottomSheet: React.FC = () => {
  // State
  const [rating, setRating] = useState(0);

  // Refs
  const feedbackTextRef = useRef("");
  const bottomSheetTextInputRef = useRef<any>(null);

  // Styles
  const reusableStyles = useReuseableStyles();
  const feedbackStyles = useSendFeedBottomSheetStyles();

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

  const createPostStyles = useCreatePostBottomSheetStyles();

  return (
    <BottomSheetScrollView
      contentContainerStyle={createPostStyles.content}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={true}
      bounces={true}
      alwaysBounceVertical={true}
      nestedScrollEnabled={true}
      decelerationRate="fast"
      overScrollMode="always"
    >
      {isLoading ? (
        <OverlayLoadingIndicator />
      ) : (
        <>
          {/* Bottom Sheet Header */}
          <Text style={reusableStyles.bottomSheetTitle}>Send Feedback</Text>
          <View style={reusableStyles.bottomSheetDivider} />
          <Text style={reusableStyles.bottomSheetSubTitle}>{"We'd love your feedback!"}</Text>

          {/* Feedback Form */}
          <BottomSheetTextInput
            ref={bottomSheetTextInputRef}
            placeholder="Feedback"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            placeholderTextColor={COLORS.darkGrey}
            style={feedbackStyles.input}
            onChangeText={(text) => (feedbackTextRef.current = text)}
          />

          {/* Rating */}
          <View style={feedbackStyles.ratingContainer}>
            <Text style={feedbackStyles.ratingText}>Rate us</Text>
            <StarRating
              step="full"
              rating={rating}
              onChange={setRating}
              starSize={30}
              color={COLORS.yellow}
              emptyColor={COLORS.yellow}
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity onPress={submitFeedback} disabled={isLoading}>
            <CustomButton text="Send Feedback" />
          </TouchableOpacity>
        </>
      )}
    </BottomSheetScrollView>
  );
};

export default SendFeedbackBottomSheet;
