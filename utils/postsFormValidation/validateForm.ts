const isFormValidated = (
  firstname: string,
  surname: string,
  selectedFaculty: string,
  setError: (error: string) => void
): boolean => {
  if (
    firstname === "" ||
    surname === "" ||
    selectedFaculty === "none"
  ) {
    setError("All fields are required");
    return false;
  } else {
    setError("");
    return true;
  }
};

export default isFormValidated;
