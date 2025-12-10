import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";

  const signInUser = async (
    emailInputRef:string,
    passwordInputRef:string,
    setError: (error: string) => void,
  ) => {
    setError("");
    try {
      await signInWithEmailAndPassword(
        auth,
        emailInputRef,
        passwordInputRef
      );
    } catch (error: any) {
      switch (error.code) {
        case "auth/invalid-credential":
        case "auth/user-not-found":
        case "auth/wrong-password":
          setError("Invalid email or password. Please try again.");
          break;
        case "auth/invalid-email":
          setError("Invalid email address");
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
  
  export default signInUser;