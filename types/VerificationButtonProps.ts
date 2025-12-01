type VerificationButtonProps = {
  firstname: string;
  surname: string;
  selectedFaculty: string;
  setError: (value: string) => void;
  setIsLoading: (value: boolean) => void;
  setIsWebViewOpen: (value: boolean) => void;
};

export default VerificationButtonProps;