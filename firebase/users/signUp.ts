import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";

const signUpUser = async (
  email: string,
  password: string,
  setError: (error: string) => void
): Promise<string | void> => {
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user.uid; // Success — return UID
  } catch (error: any) {
    // Map Firebase Auth error codes to clear, user-friendly messages
    switch (error.code) {
      case "auth/email-already-in-use":
      case "auth/email-already-exists":
        setError("This email is already registered. Try signing in instead.");
        break;

      case "auth/invalid-email":
        setError("Please enter a valid email address.");
        break;

      case "auth/weak-password":
        setError("Password must be at least 6 characters long.");
        break;

      case "auth/missing-password":
        setError("Please enter a password.");
        break;

      case "auth/missing-email":
        setError("Please enter an email address.");
        break;

      case "auth/too-many-requests":
        setError("Too many failed attempts. Please try again later.");
        break;

      case "auth/network-request-failed":
        setError("Network error. Check your internet connection and try again.");
        break;

      case "auth/operation-not-allowed":
        setError("Email/password accounts are not enabled. Contact support.");
        break;

      case "auth/user-disabled":
        setError("This account has been disabled.");
        break;

      case "auth/internal-error":
        setError("An internal error occurred. Please try again.");
        break;

      case "auth/invalid-credential":
        setError("Invalid email or password format.");
        break;

      default:
        // Fallback for any unexpected error
        setError("Failed to create account. Please try again.");
        break;
    }
  }
};

export default signUpUser;
