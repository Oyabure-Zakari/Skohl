import React, { useRef, useState } from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import StarRating from "react-native-star-rating-widget";
import Toast from "react-native-toast-message";

import { BottomSheetTextInput, BottomSheetView } from "@gorhom/bottom-sheet";
import { useMutation } from "@tanstack/react-query";

import { useAuth } from "@/contexts/AuthContext";

import COLORS from "@/constants/colors";

import CustomButton from "@/components/reuseableComponents/CustomButton";
import OverlayLoadingIndicator from "../reuseableComponents/OverlayLoadingIndicator";

import submitFeedback from "@/firebase/feedbacks/sendFeedback";

const SendFeedbackBottomSheet: React.FC = () => {
  const [rating, setRating] = useState(0);

  const feedbackTextRef = useRef("");
  const bottomSheetTextInputRef = useRef<any>(null);

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
          <Text style={styles.title}>Send Feedback</Text>
          <View style={styles.divider} />
          <Text style={styles.subtitle}>{"We'd love your feedback!"}</Text>

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

const styles = StyleSheet.create({
  content: { flex: 1, alignItems: "center", paddingBottom: 100 },
  title: { color: COLORS.darkGrey, fontFamily: "Segoe_UI_Bold" },
  divider: { width: "100%", height: 2, backgroundColor: COLORS.lightGrey, marginTop: 20 },
  subtitle: { color: COLORS.darkBlue, fontFamily: "Segoe_UI_Bold", fontSize: 16, marginTop: 10 },
  input: {
    width: "90%",
    backgroundColor: COLORS.lightGrey,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginVertical: 20,
    color: COLORS.darkGrey,
    fontFamily: "Segoe_UI_Bold",
  },
  ratingContainer: { gap: 10, alignItems: "center", paddingVertical: 20 },
  ratingText: { color: COLORS.darkGrey, fontFamily: "Segoe_UI_Bold" },
});

export default SendFeedbackBottomSheet;
