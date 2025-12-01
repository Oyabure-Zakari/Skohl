import StudentInfoType from "./StudentInfoType";

type VerificationStoreStore = {
  verificationToken: string;
  studentInfo: StudentInfoType;
  getVerificationToken: (value: StudentInfoType) => void;
  checkVerificationToken: () => void;
  clearVerificationToken: () => void;
};

export default VerificationStoreStore;