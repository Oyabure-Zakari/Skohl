import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";

  const signUpUser = async (
    emailInputRef: string,
    passwordInputRef: string,
    setError: (error: string) => void
  ) => {
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailInputRef,
        passwordInputRef
      );
      return userCredential.user.uid;
    } catch (error: any) {
      switch (error.code) {
        case "auth/email-already-exists":
          setError("Email already exists");
          break;
        case "auth/invalid-email":
          setError("Invalid email address");
          break;
        case "auth/invalid-password":
          setError("Password should be at least 6 characters");
          break;
        case "auth/too-many-requests":
          setError("Too many requests");
          break;
        case "auth/network-request-failed":
          setError("Network request failed");
          break;
        case "auth/internal-error":
          setError("Internal error");
          break;
        default:
          setError("Something went wrong");
          break;
      }
    }
  };

export default signUpUser;