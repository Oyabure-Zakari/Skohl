const isFormValidated = (
  firstname: string,
  surname: string,
  faculty: string,
  selectedUniversity: string,
  setError: (error: string) => void
): boolean => {
  if (
    firstname === "" ||
    surname === "" ||
    faculty === "" ||
    selectedUniversity === "none"
  ) {
    setError("All fields are required");
    return false;
  } else {
    setError("");
    return true;
  }
};

export default isFormValidated;
