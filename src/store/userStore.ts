import { create } from "zustand";

// Zustand 스토어 생성

export interface userState {
  localValue: string;
  setLocalValue: (localValue: string) => void;
}

const useUserStore = create<userState>((set) => ({
  localValue: "Albania",
  setLocalValue: (localValue) => set({ localValue }),
}));

export default useUserStore;
