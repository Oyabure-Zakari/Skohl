import { BottomSheetTextInput, BottomSheetView } from "@gorhom/bottom-sheet";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import StarRating from "react-native-star-rating-widget";

import CustomButton from "@/components/reuseableComponents/CustomButton";
import COLORS from "@/constants/colors";

const SendFeedbackBottomSheet: React.FC = () => {
  const [rating, setRating] = React.useState(0);
  const feedbackTextRef = React.useRef("");

  const handleSendFeedback = () => {
    console.log("Feedback sent", { rating, text: feedbackTextRef.current });
  };

  return (
    <BottomSheetView style={styles.content}>
      <Text style={styles.title}>Send Feedback</Text>
      <View style={styles.divider} />
      <Text style={styles.subtitle}>{"We'd love your feedback!"}</Text>

      <BottomSheetTextInput
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
          rating={rating}
          onChange={setRating}
          starSize={30}
          color={COLORS.yellow}
          emptyColor={COLORS.yellow}
        />
      </View>

      <TouchableOpacity onPress={handleSendFeedback}>
        <CustomButton text="Send Feedback" />
      </TouchableOpacity>
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
