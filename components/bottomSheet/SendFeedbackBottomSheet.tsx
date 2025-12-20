import { BottomSheetTextInput, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import StarRating from "react-native-star-rating-widget";

import CustomButton from "@/components/reuseableComponents/CustomButton";
import COLORS from "@/constants/colors";
import { useAuth } from "@/contexts/AuthContext";
import usersCollectionRef from "@/firebase/collectionRef/usersCollectionRef";
import { db } from "@/firebase/firebase.config";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import FormErrorText from "../reuseableComponents/FormErrorText";
import OverlayLoadingIndicator from "../reuseableComponents/OverlayLoadingIndicator";

import Toast from "react-native-toast-message";

const SendFeedbackBottomSheet: React.FC = () => {
  // Current user
  const { userUid } = useAuth();

  const [error, setError] = useState("");
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const feedbackTextRef = useRef("");
  const bottomSheetTextInputRef = useRef<any>(null);

  const isFeedbackValid = () => {
    if (!feedbackTextRef.current.trim() && rating === 0) {
      setError("Please provide feedback or rating.");
      return false;
    }
    setError("");
    return true;
  };

  const submitFeedback = async () => {
    try {
      setIsLoading(true);
      // Get the user's full name
      let fullName;

      // A query to find the user document with the matching uid field (i.e the current user)
      const q = query(usersCollectionRef, where("uid", "==", userUid));

      // Execute the query
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        fullName = `${doc.data().surname} ${doc.data().firstname}`;
      });

      // Add a new feedback document with a generated id.
      const docRef = await addDoc(collection(db, "feedbacks"), {
        docId: "",
        feedback: feedbackTextRef.current,
        rating,
        postedBy: {
          uid: userUid,
          fullName,
        },
        createdAt: serverTimestamp(),
      });

      // Update the newly created document with the generated id
      await updateDoc(doc(db, "feedbacks", docRef.id), {
        docId: docRef.id,
      });

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
    } catch (error: any) {
      // Toast message to show error occurred while sending feedback
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "An error occurred while sending your feedback. Please try again later.",
      });
      console.log(error.message);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendFeedback = async () => {
    if (isFeedbackValid()) {
      await submitFeedback();
    }
  };

  if (isLoading) {
    return <OverlayLoadingIndicator />;
  }

  return (
    <BottomSheetView style={styles.content}>
      <Text style={styles.title}>Send Feedback</Text>
      <View style={styles.divider} />
      <Text style={styles.subtitle}>{"We'd love your feedback!"}</Text>

      <FormErrorText error={error} />

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
          if (error) setError("");
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
