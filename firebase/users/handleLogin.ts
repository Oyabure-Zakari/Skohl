import { TextInput } from "react-native";
import signInUser from "./signIn";

const handleLogin = async (
  emailInputRef: string,
  passwordInputRef: string,
  textInputRef: React.RefObject<TextInput | null>,
  setError: (error: string) => void,
  setIsLoading: (isLoading: boolean) => void
) => {
  (() => {
    if (!emailInputRef || !passwordInputRef) {
      setError("All fields are required");
      return false;
    }

    setError("");
    return true;
  })();
  try {
    setIsLoading(true);
    await signInUser(emailInputRef, passwordInputRef, setError);
  } catch (error: any) {
    setError(error.message);
  } finally {
    setIsLoading(false);
    if (textInputRef?.current) textInputRef.current.clear();
    emailInputRef = "";
    passwordInputRef = "";
  }
};

export default handleLogin;
