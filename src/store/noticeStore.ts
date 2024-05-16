import { create } from "zustand";

export interface noticeState {
  noticeCount: number;
  setNoticeCount: (noticeCount: number) => void;
}

const useNoticeStore = create<noticeState>((set) => ({
  noticeCount: 0,
  setNoticeCount: (noticeCount) => set({ noticeCount }),
}));

export default useNoticeStore;