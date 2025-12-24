import { create } from "zustand";

type PhotoStoreTypes = {
  image: string;
  setImage: (value: string) => void;
  clearImage: () => void;
}

const usePhotoStore = create<PhotoStoreTypes>()((set) => ({
  image: "",
  setImage: (value) => set({image: value}),
  clearImage: () => set({image: ""})
}));

export default usePhotoStore;