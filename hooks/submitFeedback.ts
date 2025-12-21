// hooks/useSubmitFeedback.ts
import usersCollectionRef from "@/firebase/collectionRef/usersCollectionRef";
import { db } from "@/firebase/firebase.config";
import { useMutation } from "@tanstack/react-query";
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
import Toast from "react-native-toast-message";

type UseSubmitFeedbackParams = {
  userUid: string;
  feedbackTextRef: React.RefObject<string>;
  rating: number;
  setRating: (rating: number) => void;
  inputRef: React.RefObject<any>; // For clearing the TextInput
};

export const useSubmitFeedback = ({
  userUid,
  feedbackTextRef,
  rating,
  setRating,
  inputRef,
}: UseSubmitFeedbackParams) => {
  // useMutation gives us methods and states which is saved in mutation variable
  const mutation = useMutation({
    mutationFn: async () => {
      const feedbackText = feedbackTextRef.current.trim();

      // Validation: Ensure at least feedback text or rating is provided
      if (!feedbackText && rating === 0) throw new Error("Please provide feedback or a rating.");

      // Variable to hold user's full name
      let fullName;

      // Query user document
      const q = query(usersCollectionRef, where("uid", "==", userUid));
      const snapshot = await getDocs(q);

      // Get user's full name
      snapshot.forEach((doc) => {
        const data = doc.data();
        fullName = `${data.surname} ${data.firstname}`;
      });

      // Add document
      const docRef = await addDoc(collection(db, "feedbacks"), {
        docId: "",
        feedback: feedbackText,
        rating,
        postedBy: { uid: userUid, fullName },
        createdAt: serverTimestamp(),
      });

      // Update document with its own ID
      await updateDoc(doc(db, "feedbacks", docRef.id), { docId: docRef.id });
    },

    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Feedback Sent",
        text2: "Thank you for your feedback!",
      });

      // Clear form
      if (inputRef?.current) inputRef.current.clear();
      feedbackTextRef.current = "";
      setRating(0);
    },

    onError: (error: any) => {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message || "Failed to send feedback.",
      });
    },
  });

  // A function to trigger the mutation, so that in the component we just call submitFeedback instead of mutation.mutate()
  const submitFeedback = () => mutation.mutate();

  return {
    submitFeedback,
    isPending: mutation.isPending, // So that in the component we use isPending instead of mutation.isPending
  };
};