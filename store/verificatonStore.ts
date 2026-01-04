import StudentInfoType from "@/types/StudentInfoType";
import VerificationStoreStore from "@/types/VerificationStoreStore";
import { captilizeWord } from "@/utils/captilizeWord";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";
import { create } from "zustand";

const useVerificationStore = create<VerificationStoreStore>((set, get) => ({
  verificationFingerprint: "",
  studentInfo: {
    firstname: "",
    surname: "",
    faculty: "",
    religion: "",
    gender: "",
  },

  // Generate and store hashed fingerprint from verified student info
  setVerifiedStudent: async (info: StudentInfoType) => {
    // Create a unique fingerprint string
    const fingerprintString = `${info.firstname}|${info.surname}|${info.faculty}|${info.religion}|${info.gender}`; 

    // Hash with SHA-256 using expo-crypto
    const hashedFingerprint = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      fingerprintString
    );

    // Save to store and AsyncStorage
    set({
      studentInfo: {
        firstname: captilizeWord(info.firstname),
        surname: captilizeWord(info.surname),
        faculty: captilizeWord(info.faculty),
        religion: captilizeWord(info.religion),
        gender: captilizeWord(info.gender),
      },
      verificationFingerprint: hashedFingerprint,
    });

    try {
      await AsyncStorage.setItem("@verificationFingerprint", hashedFingerprint);
    } catch (error: any) {
      console.error("Error saving fingerprint:", error.message);
    }
  },

  // Load fingerprint on app start
  loadVerificationFingerprint: async () => {
    try {
      const storedFingerprint = await AsyncStorage.getItem("@verificationFingerprint");
      if (storedFingerprint) {
        set({ verificationFingerprint: storedFingerprint });
      }
    } catch (error: any) {
      console.error("Error loading fingerprint:", error.message);
    }
  },

  // Clear everything (on logout, etc.)
  clearVerification: async () => {
    try {
      await AsyncStorage.removeItem("@verificationFingerprint");
      set({
        verificationFingerprint: "",
        studentInfo: {
          firstname: "",
          surname: "",
          faculty: "",
          religion: "",
          gender: "",
        },
      });
    } catch (error: any) {
      console.error("Error clearing verification:", error.message);
    }
  },
}));

export default useVerificationStore;