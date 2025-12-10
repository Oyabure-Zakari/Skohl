const isFormFilled = (
  email: string,
  password: string,
  setError: (error: string) => void,
  image?: string | null,  
  confirmPassword?: string
): boolean => {
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
};

export default isFormFilled;