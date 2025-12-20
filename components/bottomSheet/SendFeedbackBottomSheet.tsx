import React, { useRef, useState } from "react";

import { Text, TouchableOpacity, View } from "react-native";

import StarRating from "react-native-star-rating-widget";
import Toast from "react-native-toast-message";

import { BottomSheetTextInput, BottomSheetView } from "@gorhom/bottom-sheet";
import { useMutation } from "@tanstack/react-query";

import { useAuth } from "@/contexts/AuthContext";

import COLORS from "@/constants/colors";

import CustomButton from "@/components/reuseableComponents/CustomButton";
import OverlayLoadingIndicator from "../reuseableComponents/OverlayLoadingIndicator";

import submitFeedback from "@/firebase/feedbacks/sendFeedback";
import useReuseableStyles from "@/styles/reuable.styles";
import useSendFeedBottomSheetStyles from "@/styles/sendFeedBottomSheetStyles";

const SendFeedbackBottomSheet: React.FC = () => {
  const [rating, setRating] = useState(0);

  const feedbackTextRef = useRef("");
  const bottomSheetTextInputRef = useRef<any>(null);

  // Styles
  const reusableStyles = useReuseableStyles();
  const styles = useSendFeedBottomSheetStyles();

  // Current user uid from auth context
  const { userUid } = useAuth();

  const { mutate: submitFeedbackMutation, isPending: isLoading } = useMutation({
    mutationFn: () => submitFeedback(userUid!, feedbackTextRef.current, rating),
    onSuccess: () => {
      // Toast message to show feedback was sent successfully
      Toast.show({
        type: "success",
        text1: "Feedback Sent",
        text2: "Thank you for your feedback!",
      });
      // Clear the text input on screen
      bottomSheetTextInputRef.current?.clear();
      // Also clear the saved text and rating
      feedbackTextRef.current = "";
      setRating(0);
    },

    onError: (error: any) => {
      // Toast message to show error occurred while sending feedback
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
      });
    },
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
            onChangeText={(text) => {
              feedbackTextRef.current = text;
              // if (error) setError("");
            }}
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

          <TouchableOpacity onPress={() => submitFeedbackMutation()}>
            <CustomButton text="Send Feedback" />
          </TouchableOpacity>
        </>
      )}
    </BottomSheetView>
  );
};

export default SendFeedbackBottomSheet;
