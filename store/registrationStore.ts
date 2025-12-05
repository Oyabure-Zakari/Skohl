// import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

type RegistrationStore = {
  error: string;
  userUid: string;
  userIdToken: string;
  isLoading: boolean;
  firebaseCreateUserWithEmailAndPassword: () => void;
};

const useRegistrationStore = create<RegistrationStore>()((set) => ({
  error: "",
  userUid: "",
  userIdToken: "",
  isLoading: true,
  firebaseCreateUserWithEmailAndPassword: () => {
    set({ isLoading: true });
  },
}));

export default useRegistrationStore;
