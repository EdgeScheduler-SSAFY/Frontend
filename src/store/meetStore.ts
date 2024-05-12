import { userList } from "@/shared/lib/type";
import { create } from "zustand";

// Zustand 스토어 생성



export interface MeetState {
  startDatetime: string;
  endDatetime: string;
  runningtime: number;
  memberList: { user: userList; isRequired: boolean }[];
  setStartDatetime: (startdatetime: string) => void;
  setEndDatetime: (endDatetime: string) => void;
  setRunningTime: (runningtime: number) => void;
  setMemberList: (memberList: { user: userList; isRequired: boolean }[]) => void;
}

const useMeetStore = create<MeetState>((set) => ({
  startDatetime: "",
  endDatetime: "",
  runningtime: 15,
  memberList: [],
  setStartDatetime: (startDatetime) => set({ startDatetime }),
  setEndDatetime: (endDatetime) => set({ endDatetime }),
  setRunningTime: (runningtime) => set({ runningtime }),
  setMemberList: (memberList) => set({ memberList }),
}));

export default useMeetStore;
