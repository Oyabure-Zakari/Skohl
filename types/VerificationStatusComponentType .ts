type VerificationStatusComponentType = {
  message: string;
  isSuccessful: boolean;
  closeVerificationComponent?: () => void;
  goToRegistrationScreen?: () => void;
};

export default VerificationStatusComponentType;