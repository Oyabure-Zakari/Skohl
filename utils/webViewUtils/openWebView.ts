import isFormValidated from "../validateForm";

const openWebView = (
  firstname: string,
  surname: string,
  faculty: string,
  selectedUniversity: string,
  setError: (error: string) => void,
  setShowWebView: (value: boolean) => void,
  setIsLoading: (value: boolean) => void
): void => {
    // Validate form
    if (
      !isFormValidated(
        firstname,
        surname,
        faculty,
        selectedUniversity,
        setError
      )
    )
      return;

    // Open Webview
    setShowWebView(true);
    // Start loading immediately
    setIsLoading(true);
};

export default openWebView;