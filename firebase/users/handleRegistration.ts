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
  setIsLoading: (isLoading: boolean) => void
) => {
  const email = emailInputRef.current;
  const password = passwordInputRef.current;
  const confirmPassword = confirmPasswordInputRef.current;
  if (!isFormFilled(email, password, setError, image, confirmPassword)) return;
  try {
    setError("");
    setIsLoading(true);

    const uid = await signUpUser(emailInputRef.current, passwordInputRef.current, setError);
    if (!uid) return;

    const uploadedImageUrl = await generateImageUrl(image, setError);
    if (!uploadedImageUrl) {
      setError("Error uploading image");
      return;
    }

    await createUser(uid, uploadedImageUrl ?? defaultImage, studentInfo, setError);
  } catch (error: any) {
    setError(error.message);
  } finally {
    setIsLoading(false);
    if (textInputRef?.current) textInputRef.current.clear();
    emailInputRef.current = "";
    passwordInputRef.current = "";
    confirmPasswordInputRef.current = "";
    image = "";
  }
};

export default handleRegistration;
