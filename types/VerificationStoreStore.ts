import StudentInfoType from "./StudentInfoType";

type VerificationStoreStore = {
  verificationToken: string;
  studentInfo: StudentInfoType;
  getVerificationToken: (value: StudentInfoType) => void;
  checkVerificationToken: () => Promise<void>;
  clearVerificationToken: () => Promise<void>;
};

export default VerificationStoreStore;