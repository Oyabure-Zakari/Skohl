import { db } from "@/firebase/firebase.config";
import StudentInfoType from "@/types/StudentInfoType";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { doc, DocumentData, serverTimestamp, setDoc } from "firebase/firestore";
import { useCallback } from "react";
import { Alert } from "react-native";

export default function useCreateUserIfMissing(
  userUid: string | null,
  verificationFingerprint: string,
  studentInfo: StudentInfoType,
  userDoc: DocumentData | null | undefined,
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<DocumentData | null, Error>>,
) {
  const createUserIfMissing = useCallback(async () => {
    if (!userUid || !verificationFingerprint || !studentInfo) return;

    // Check if user doc already exists
    if (userDoc) return; // Already created

    try {
      await setDoc(doc(db, "users", userUid), {
        uid: userUid,
        image: "",
        firstname: studentInfo.firstname,
        surname: studentInfo.surname,
        faculty: studentInfo.faculty,
        gender: studentInfo.gender,
        religion: studentInfo.religion,
        bio: "",
        verificationFingerprint,
        joinedAt: serverTimestamp(),
      });
      refetch(); // Refresh query
    } catch (error: any) {
      // Show alert with retry option
      Alert.alert(
        "Error Creating User",
        `Failed to create your user profile: ${error.message || "Unknown error"}`,
        [
          {
            text: "Retry",
            onPress: () => {
              refetch(); // This will trigger the query again
            },
          },
        ],
        { cancelable: false },
      );
    }
  }, [userUid, verificationFingerprint, studentInfo, userDoc, refetch]);

  return { createUserIfMissing };
}
