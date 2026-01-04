import useVerificationStore from "@/store/verificatonStore";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDocs, query, where } from "firebase/firestore";
import { Alert } from "react-native";
import usersCollectionRef from "../collectionRef/usersCollectionRef";
import { auth } from "../firebase.config";

const signInUser = async (
  email: string,
  password: string,
  setError: (error: string) => void,
  verificationFingerprint: string
) => {
  setError("");

  try {
    // Sign in with email/password
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userUid = userCredential.user.uid;

    // Fetch user document
    const q = query(usersCollectionRef, where("uid", "==", userUid));
    const snapshot = await getDocs(q);

    // No user document found — suspicious activity
    if (snapshot.empty) {
      await signOut(auth);
      setError("Account not found or not verified. Please register again.");
      return;
    }

    // Retrieve stored fingerprint
    let storedFingerprint = "";
    snapshot.forEach((doc) => {
      const data = doc.data();
      storedFingerprint = data?.verificationFingerprint || "";
    });

    // Critical Security Check
    if (storedFingerprint !== verificationFingerprint) {
      // Mismatch → immediately sign out and block access
      Alert.alert(
        "Unable to Log In ⚠️",
        "The verification details don't match your original signup. Please use the same information you provided during registration.",
        [
          {
            text: "OK",
            onPress: async () => {
              await useVerificationStore.getState().clearVerification();
              await signOut(auth)
            },
          },
        ]
      );
      return;
    }

    // All good — login successful
    console.log("Login successful with matching verification fingerprint");
  } catch (error: any) {
    // Firebase Auth errors
    switch (error.code) {
      case "auth/invalid-credential":
        setError("Invalid email or password.");
        break;
      case "auth/invalid-email":
        setError("Invalid email address.");
        break;
      case "auth/user-disabled":
        setError("This account has been disabled.");
        break;
      case "auth/too-many-requests":
        setError("Too many attempts. Try again later.");
        break;
      case "auth/network-request-failed":
        setError("Network error. Check your connection.");
        break;
      case "auth/user-not-found":
      case "auth/wrong-password":
        setError("Invalid email or password.");
        break;
      default:
        setError("Login failed. Please try again.");
        console.error("Login error:", error);
    }
  }
};

export default signInUser;
