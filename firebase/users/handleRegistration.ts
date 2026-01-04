import StudentInfoType from "@/types/StudentInfoType";
import generateImageUrl from "@/utils/cloudinary/generateImageUrl";
import isFormFilled from "@/utils/regiserAndLoginFormValidation";
import { TextInput } from "react-native";
import createUser from "./createUser";
import signUpUser from "./signUp";

const defaultImage =
  "https://res.cloudinary.com/dngo9kz1b/image/upload/v1765389175/qzg6bcjcwsryd70y4qtp.jpg";

const handleRegistration = async (
  image: string,
  studentInfo: StudentInfoType,
  emailInputRef: React.RefObject<string>,
  passwordInputRef: React.RefObject<string>,
  confirmPasswordInputRef: React.RefObject<string>,
  textInputRef: React.RefObject<TextInput | null>,
  setError: (error: string) => void,
  setIsLoading: (isLoading: boolean) => void,
  verificationFingerprint: string
) => {
  // Extract current values from refs
  const email = emailInputRef.current;
  const password = passwordInputRef.current;
  const confirmPassword = confirmPasswordInputRef.current;

  // Define the current screen for validation
  const authScreen = "Registration Screen";
  // Validate form inputs
  if (!isFormFilled(email, password, setError, image, confirmPassword, authScreen)) return;

  try {
    setError("");
    setIsLoading(true);
  
    // Sign up user and get uid
    const uid = await signUpUser(emailInputRef.current, passwordInputRef.current, setError);
    if (!uid) return;

    // Upload image and get URL
    const uploadedImageUrl = await generateImageUrl(image, setError);
    if (!uploadedImageUrl) {
      setError("Error uploading image");
      return;
    }
    // Create user document in Firestore
    await createUser(uid, uploadedImageUrl ?? defaultImage, studentInfo, setError, verificationFingerprint);
  } catch (error: any) {
    setError(error.message);
  } finally {
    setIsLoading(false);
    // Clear input fields
    if (textInputRef?.current) textInputRef.current.clear();
    emailInputRef.current = "";
    passwordInputRef.current = "";
    confirmPasswordInputRef.current = "";
  }
};

export default handleRegistration;
