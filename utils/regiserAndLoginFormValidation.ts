const isFormFilled = (
  email: string,
  password: string,
  setError: (error: string) => void,
  image?: string | null,  
  confirmPassword?: string,
  authScreen?: string,
): boolean => {
  // Registration form validation
  if (authScreen === "Registration Screen") {
  if (!image) {
    setError("Select an image from your device");
    return false;
  }

  if (!email || !password || !confirmPassword) {
    setError("All fields are required");
    return false;
  }

  if (password !== confirmPassword) {
    setError("Passwords do not match");
    return false;
  }

  setError("");
  return true;
  } else {
    // Login form validation
    if (!email || !password) {
      setError("Email and password are required");
      return false;
    }
    setError("");
    return true;
  }
};

export default isFormFilled;