type VerificationButtonProps = {
  firstnameInputRef: string;
  surnameInputRef: string;
  selectedFaculty: string;
  setError: (value: string) => void;
  setIsLoading: (value: boolean) => void;
  setIsWebViewOpen: (value: boolean) => void;
};

export default VerificationButtonProps;