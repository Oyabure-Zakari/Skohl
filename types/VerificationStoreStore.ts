import StudentInfoType from "./StudentInfoType";

type VerificationStoreStore = {
verificationFingerprint: string; // Hashed fingerprint
  studentInfo: StudentInfoType;
  setVerifiedStudent: (info: StudentInfoType) => Promise<void>;
  loadVerificationFingerprint: () => Promise<void>;
  loadVerifiedStudentInfo: () => Promise<void>;
  clearVerification: () => Promise<void>;
};

export default VerificationStoreStore;