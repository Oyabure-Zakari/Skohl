import VerificationStoreStore from "@/types/VerificationStoreStore";
import { captilizeWord } from "@/utils/captilizeWord";
import { create } from "zustand";

const useVerificationStore = create<VerificationStoreStore>()((set) => ({
  verificationToken: "",
  studentInfo: {
    firstname: "",
    surname: "",
    faculty: "",
    religion: "",
    gender: "",
  },
  getVerificationToken: (value) => {
    if (value) {
      set({
        studentInfo: {
          firstname: captilizeWord(value.firstname),
          surname: captilizeWord(value.surname),
          faculty: captilizeWord(value.faculty),
          religion: captilizeWord(value.religion),
          gender: captilizeWord(value.gender),
        },
        verificationToken: "verified",
      });
    }
  },
  checkVerificationToken: () => set({ verificationToken: "" }),
  clearVerificationToken: () => set({ verificationToken: "" }),
}));

export default useVerificationStore;
