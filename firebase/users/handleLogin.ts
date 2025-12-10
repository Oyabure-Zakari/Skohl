import signInUser from "./signIn";

const handleLogin = async (
  emailInputRef: string,
  passwordInputRef: string,
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
  }
};

export default handleLogin;
