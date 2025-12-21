import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";

const signInUser = async (
  email: string,
  password: string,
  setError: (error: string) => void,
) => {
  setError("");
  try {
    // Sign in with email and password
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    switch (error.code) {
      // Most common: wrong password, user not found, or malformed credentials
      // Firebase often returns this single code for security (email enumeration protection)
      case "auth/invalid-credential":
        setError("Invalid email or password. Please try again.");
        break;

      // Email format issues
      case "auth/invalid-email":
        setError("Please enter a valid email address.");
        break;

      // Account disabled by admin
      case "auth/user-disabled":
        setError("This account has been disabled. Contact support.");
        break;

      // Too many failed attempts — temporary lock
      case "auth/too-many-requests":
        setError("Too many failed attempts. Please try again later.");
        break;

      // Network/offline issues
      case "auth/network-request-failed":
        setError("Network error. Check your connection and try again.");
        break;

      // User recently deleted or other internal issues
      case "auth/user-not-found":
        setError("No account found with this email.");
        break;

      case "auth/wrong-password":
        setError("Incorrect password. Please try again.");
        break;

      // Generic internal or unexpected errors
      case "auth/internal-error":
      case "auth/operation-not-allowed":
        setError("Authentication service error. Please try again later.");
        break;

      // Timeout or cancelled
      case "auth/timeout":
        setError("Request timed out. Please try again.");
        break;

      // Fallback for any unhandled error code
      default:
        setError("An unexpected error occurred. Please try again.");
        break;
    }
  }
};

export default signInUser;