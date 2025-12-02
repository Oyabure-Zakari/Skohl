import VerificationStoreStore from "@/types/VerificationStoreStore";
import { captilizeWord } from "@/utils/captilizeWord";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
    const token = process.env.EXPO_PUBLIC_VERIFICATION_TOKEN;
    if (value) {
      // Set student info
      set({
        studentInfo: {
          firstname: captilizeWord(value.firstname),
          surname: captilizeWord(value.surname),
          faculty: captilizeWord(value.faculty),
          religion: captilizeWord(value.religion),
          gender: captilizeWord(value.gender),
        },
      });

      // Store token in AsyncStorage
      (async () => {
        try {
          await AsyncStorage.setItem("@verificationToken", token!);
        } catch (error: any) {
          console.log("Error storing token", error.message);
        }
      })();
    }
  },

  // Retrieve token from AsyncStorage
  checkVerificationToken: async () => {
    try {
      const storedToken = await AsyncStorage.getItem("@verificationToken");
      if (storedToken) {
        set({ verificationToken: storedToken });
      }
    } catch (error: any) {
      console.log("Error retrieving token", error.message);
    }
  },
  clearVerificationToken: async () => {
    try {
      await AsyncStorage.removeItem("@verificationToken");
      set({ verificationToken: "" });
    } catch (error: any) {
      console.log("Error clearing token", error.message);
    }
  },
}));

export default useVerificationStore;
