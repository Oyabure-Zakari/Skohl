import isFormFilled from "@/utils/regiserAndLoginFormValidation";
import { TextInput } from "react-native";
import signInUser from "./signIn";

const handleLogin = async (
  emailInputRef: React.RefObject<string>,
  passwordInputRef: React.RefObject<string>,
  textInputRef: React.RefObject<TextInput | null>,
  setError: (error: string) => void,
  setIsLoading: (isLoading: boolean) => void,
  verificationFingerprint: string
) => {
  // Define the current screen for validation
  const authScreen = "Login Screen";

  // Validate form inputs
  if (!isFormFilled(emailInputRef.current, passwordInputRef.current, setError, authScreen)) return;
  try {
    setIsLoading(true);
    // Attempt to sign in the user
    await signInUser(emailInputRef.current, passwordInputRef.current, setError, verificationFingerprint);
  } catch (error: any) {
    setError(error.message);
  } finally {
    setIsLoading(false);
    // Clear input fields
    if (textInputRef?.current) textInputRef.current.clear();
    emailInputRef.current = "";
    passwordInputRef.current = "";
  }
};

export default handleLogin;
