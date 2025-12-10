import StudentInfoType from "@/types/StudentInfoType";
import generateImageUrl from "@/utils/cloudinary/generateImageUrl";
import isFormFilled from "@/utils/regiserAndLoginFormValidation";
import createUser from "./createUser";
import signUpUser from "./signUp";

const defaultImage = "https://res.cloudinary.com/dngo9kz1b/image/upload/v1765389175/qzg6bcjcwsryd70y4qtp.jpg";

const handleRegistration = async (
  image: string,
  studentInfo: StudentInfoType,
  emailInputRef: string,
  passwordInputRef: string,
  confirmPasswordInputRef: string,
  setError: (error: string) => void,
  setIsLoading: (isLoading: boolean) => void
) => {
  if (!isFormFilled(emailInputRef, passwordInputRef, setError, image, confirmPasswordInputRef))
    return;
  try {
    setError("");
    setIsLoading(true);
    const uid = await signUpUser(emailInputRef, passwordInputRef, setError);
    const uploadedImageUrl = await generateImageUrl(image, setError);
    await createUser(uid!, uploadedImageUrl ?? defaultImage, studentInfo, setError);
  } catch (error: any) {
    setError(error.message);
  } finally {
    setIsLoading(false);
  }
};

export default handleRegistration;
