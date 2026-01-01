import { auth } from "@/firebase/firebase.config";
import useVerificationStore from "@/store/verificatonStore";
import { signOut } from "firebase/auth";

const useHandleLogOut = () => {
  // Zustand
  const clearToken = useVerificationStore((state) => state.clearVerificationToken);
  const handleLogOut = async () => {
    try {
      await clearToken();
      await signOut(auth);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return { handleLogOut };
};

export default useHandleLogOut;
