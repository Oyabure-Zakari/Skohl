import { TextInput } from "react-native";
import signInUser from "./signIn";

const handleLogin = async (
  emailInputRef: React.RefObject<string>,
  passwordInputRef: React.RefObject<string>,
  textInputRef: React.RefObject<TextInput | null>,
  setError: (error: string) => void,
  setIsLoading: (isLoading: boolean) => void
) => {
  (() => {
    if (!emailInputRef.current || !passwordInputRef.current) {
      setError("All fields are required");
      return false;
    }

    setError("");
    return true;
  })();
  try {
    setIsLoading(true);
    await signInUser(emailInputRef.current, passwordInputRef.current, setError);
  } catch (error: any) {
    setError(error.message);
  } finally {
    setIsLoading(false);
    if (textInputRef?.current) textInputRef.current.clear();
    emailInputRef.current = "";
    passwordInputRef.current = "";
  }
};

export default handleLogin;
