import { create } from "zustand";

type PhotoStoreTypes = {
  image: string;
  setImage: (value: string) => void;
}

const usePhotoStore = create<PhotoStoreTypes>()((set) => ({
  image: "",
  setImage: (value) => set({image: value}),
}));

export default usePhotoStore;