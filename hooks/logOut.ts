import { auth } from "@/firebase/firebase.config";
import useVerificationStore from "@/store/verificatonStore";
import { signOut } from "firebase/auth";

const useHandleLogOut = () => {
  // Zustand
  const clearVerificationFingerprint = useVerificationStore((state) => state.clearVerification);
  const handleLogOut = async () => {
    try {
      await clearVerificationFingerprint();
      await signOut(auth);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return { handleLogOut };
};

export default useHandleLogOut;
